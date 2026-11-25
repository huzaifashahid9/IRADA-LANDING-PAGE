import { site } from '@/content/site';

export default function sitemap() {
  return [{ url: site.url, changeFrequency: 'monthly', priority: 1 }];
}
