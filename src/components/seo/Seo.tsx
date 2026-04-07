import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { siteConfig } from "@/lib/site";

type StructuredData = Record<string, unknown> | Record<string, unknown>[];

interface SeoProps {
  title?: string;
  description?: string;
  path?: string;
  canonical?: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  noindex?: boolean;
  nofollow?: boolean;
  keywords?: string[];
  structuredData?: StructuredData;
}

const MANAGED_ATTR = "data-seo-managed";

function toAbsoluteUrl(path: string) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${siteConfig.url.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

function setMeta(attribute: "name" | "property", value: string, content: string) {
  let tag = document.head.querySelector(`meta[${attribute}="${value}"]`) as HTMLMetaElement | null;

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, value);
    tag.setAttribute(MANAGED_ATTR, "true");
    document.head.appendChild(tag);
  }

  tag.content = content;
  tag.setAttribute(MANAGED_ATTR, "true");
}

function setLink(rel: string, href: string) {
  let tag = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;

  if (!tag) {
    tag = document.createElement("link");
    tag.rel = rel;
    tag.setAttribute(MANAGED_ATTR, "true");
    document.head.appendChild(tag);
  }

  tag.href = href;
  tag.setAttribute(MANAGED_ATTR, "true");
}

export function Seo({
  title,
  description = siteConfig.description,
  path,
  canonical,
  image = siteConfig.defaultImage,
  imageAlt = siteConfig.name,
  type = "website",
  noindex = false,
  nofollow = false,
  keywords,
  structuredData,
}: SeoProps) {
  const location = useLocation();

  useEffect(() => {
    const pageTitle = title
      ? title.includes(siteConfig.name)
        ? title
        : `${title} | ${siteConfig.name}`
      : siteConfig.name;
    const urlPath = path ?? location.pathname;
    const absoluteUrl = canonical ?? toAbsoluteUrl(urlPath);
    const absoluteImage = toAbsoluteUrl(image);
    const previousTitle = document.title;

    document.title = pageTitle;
    setMeta("name", "description", description);
    setMeta(
      "name",
      "robots",
      noindex
        ? `${nofollow ? "noindex,nofollow" : "noindex,follow"}`
        : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    );
    setMeta("name", "keywords", keywords?.join(", ") ?? "");
    setMeta("property", "og:title", pageTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", absoluteUrl);
    setMeta("property", "og:image", absoluteImage);
    setMeta("property", "og:image:alt", imageAlt);
    setMeta("property", "og:site_name", siteConfig.name);
    setMeta("name", "twitter:title", pageTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", absoluteImage);
    setMeta("name", "twitter:image:alt", imageAlt);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:site", siteConfig.twitterHandle);
    setLink("canonical", absoluteUrl);

    if (structuredData) {
      const existingScript = document.head.querySelector(
        `script[type="application/ld+json"][${MANAGED_ATTR}="true"]`,
      );

      if (existingScript) {
        existingScript.textContent = JSON.stringify(structuredData);
      } else {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute(MANAGED_ATTR, "true");
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
      }
    }

    return () => {
      document.title = previousTitle;
    };
  }, [canonical, description, image, imageAlt, keywords, location.pathname, noindex, nofollow, path, structuredData, title, type]);

  return null;
}