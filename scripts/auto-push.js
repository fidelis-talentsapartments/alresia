#!/usr/bin/env node

/**
 * Auto Git Push Script
 *
 * Features:
 * - Checks Git installation
 * - Initializes repo if needed
 * - Creates dynamic backup branch
 * - Adds all files
 * - Commits changes
 * - Pushes to GitHub automatically
 *
 * Required ENV:
 * GITHUB_TOKEN=
 * GITHUB_USERNAME= (optional if using GITHUB_REPO_URL)
 * GITHUB_REPO=
 * GITHUB_REPO_URL=
 * GITHUB_BASE_BRANCH= (default: dev)
 *
 * Optional ENV:
 * AUTO_GIT_PUSH=true
 * AUTO_GIT_BRANCH_PREFIX=autosave
 */

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function log(...args) {
  console.log("[auto-push]", ...args);
}

function fail(...args) {
  console.error("[auto-push]", ...args);
  process.exit(1);
}

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) continue;

    const eqIndex = trimmed.indexOf("=");

    if (eqIndex <= 0) continue;

    const key = trimmed.slice(0, eqIndex).trim();

    let value = trimmed.slice(eqIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function run(cmd, args, options = {}) {
  log(`Running: ${cmd} ${args.join(" ")}`);

  const result = spawnSync(cmd, args, {
    stdio: "pipe",
    encoding: "utf8",
    ...options,
  });

  if (result.stdout?.trim()) {
    console.log(result.stdout.trim());
  }

  if (result.stderr?.trim()) {
    console.error(result.stderr.trim());
  }

  if (result.error) {
    fail(`Failed running ${cmd}:`, result.error.message);
  }

  if (result.status !== 0) {
    fail(`${cmd} exited with status ${result.status}`);
  }

  return result;
}

function runSafe(cmd, args, options = {}) {
  log(`Running (safe): ${cmd} ${args.join(" ")}`);

  const result = spawnSync(cmd, args, {
    stdio: "pipe",
    encoding: "utf8",
    ...options,
  });

  if (result.stdout?.trim()) {
    console.log(result.stdout.trim());
  }

  if (result.stderr?.trim()) {
    console.error(result.stderr.trim());
  }

  return result;
}

function copyDirectory(source, destination) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const entries = fs.readdirSync(source, { withFileTypes: true });

  for (const entry of entries) {
    //
    // SKIP GIT
    //
    if (entry.name === ".git") continue;

    //
    // SKIP NODE MODULES
    //
    if (entry.name === "node_modules") continue;

    //
    // SKIP BUILD OUTPUTS
    //
    if (
      entry.name === "dist" ||
      entry.name === "build" ||
      entry.name === ".next"
    ) {
      continue;
    }

    const sourcePath = path.join(source, entry.name);
    const destinationPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(sourcePath, destinationPath);
    } else {
      fs.copyFileSync(sourcePath, destinationPath);
    }
  }
}

const projectRoot = path.join(__dirname, "..");

loadEnvFile(path.join(projectRoot, ".env"));
loadEnvFile(path.join(projectRoot, ".env.local"));

const AUTO_PUSH = (process.env.AUTO_GIT_PUSH || "false").toLowerCase();

if (AUTO_PUSH !== "true") {
  log("AUTO_GIT_PUSH not enabled; skipping auto push.");
  process.exit(0);
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_REPO_URL = process.env.GITHUB_REPO_URL;

const BASE_BRANCH = process.env.GITHUB_BASE_BRANCH || "dev";

if (!GITHUB_TOKEN) {
  fail("Missing GITHUB_TOKEN");
}

if (!GITHUB_REPO_URL && (!GITHUB_USERNAME || !GITHUB_REPO)) {
  fail("Missing GITHUB_REPO_URL or GITHUB_USERNAME + GITHUB_REPO");
}

//
// CHECK GIT
//
try {
  const gitVersion = runSafe("git", ["--version"]);

  if (gitVersion.error) {
    throw gitVersion.error;
  }

  log("Git detected:", gitVersion.stdout.trim());
} catch (e) {
  fail("Git is not installed or not available in PATH");
}

//
// CREATE BRANCH NAME
//
const branchPrefix = process.env.AUTO_GIT_BRANCH_PREFIX || "autosave";

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

const branchName = `${branchPrefix}/${timestamp}`;

log("Target branch:", branchName);

//
// BUILD REMOTE URL
//
const safeToken = encodeURIComponent(GITHUB_TOKEN);

const rawRepoUrl =
  GITHUB_REPO_URL || `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO}.git`;

const remoteUrl = rawRepoUrl.replace(
  "https://",
  `https://oauth2:${safeToken}@`,
);

//
// CREATE TEMP WORKSPACE
//
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "auto-push-"));

log("Created temp workspace:", tempRoot);

//
// CLONE TARGET REPOSITORY
//
log("Cloning target repository...");

const cloneResult = runSafe(
  "git",
  ["clone", "--branch", BASE_BRANCH, remoteUrl, tempRoot],
  {
    cwd: projectRoot,
  },
);

//
// FALLBACK IF BASE BRANCH DOES NOT EXIST
//
if (cloneResult.status !== 0) {
  log("Base branch clone failed. Trying fresh clone...");

  run("git", ["clone", remoteUrl, tempRoot], {
    cwd: projectRoot,
  });
}

//
// CONFIGURE GIT USER
//
try {
  run("git", ["config", "user.name", GITHUB_USERNAME || "autosync"], {
    cwd: tempRoot,
  });

  run(
    "git",
    [
      "config",
      "user.email",
      `${GITHUB_USERNAME || "autosync"}@users.noreply.github.com`,
    ],
    {
      cwd: tempRoot,
    },
  );
} catch (e) {
  fail("Failed configuring git user");
}

//
// FETCH LATEST REMOTE STATE
//
log("Fetching latest remote state...");

runSafe("git", ["fetch", "origin"], {
  cwd: tempRoot,
});

//
// CREATE PR BRANCH FROM VALID HISTORY
//
log("Creating PR branch...");

const branchResult = runSafe("git", ["checkout", "-b", branchName], {
  cwd: tempRoot,
});

//
// FALLBACK IF BRANCH ALREADY EXISTS
//
if (branchResult.status !== 0) {
  log("Branch already exists. Recreating...");

  run("git", ["checkout", "-B", branchName], {
    cwd: tempRoot,
  });
}

//
// CREATE .gitignore IF MISSING
//
const gitignorePath = path.join(projectRoot, ".gitignore");

if (!fs.existsSync(gitignorePath)) {
  log("Creating .gitignore...");

  fs.writeFileSync(
    gitignorePath,
    `
node_modules
dist
build
.next
.env
.env.local
.env.*
.DS_Store
.supabase
`.trim(),
  );
}

//
// COPY PROJECT FILES INTO TEMP REPO
//
log("Copying project files into temp repository...");

copyDirectory(projectRoot, tempRoot);

//
// ADD FILES
//
log("Adding files...");

run("git", ["add", "-A"], {
  cwd: tempRoot,
});

//
// CHECK CHANGES
//
const statusResult = runSafe("git", ["status", "--porcelain"], {
  cwd: tempRoot,
});

const changes = statusResult.stdout.trim();

if (!changes) {
  log("No changes detected.");
  process.exit(0);
}

//
// COMMIT
//
const commitMessage = `Auto backup ${timestamp}`;

log("Creating commit...");

const commitResult = runSafe("git", ["commit", "-m", commitMessage], {
  cwd: tempRoot,
});

//
// HANDLE EMPTY COMMIT CASE
//
if (
  commitResult.status !== 0 &&
  !commitResult.stderr.includes("nothing to commit")
) {
  fail("Commit failed");
}

//
// PUSH
//
log("Pushing to GitHub...");

run("git", ["push", "-u", "origin", branchName], {
  cwd: tempRoot,
});

log("=================================");
log("AUTO PUSH COMPLETED SUCCESSFULLY");
log("=================================");
log(`Branch: ${branchName}`);
log(`Repo: ${rawRepoUrl}`);

process.exit(0);
