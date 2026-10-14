import { DocsLayout } from "@/components/docs/docs-layout";
import { source } from "@/lib/source";

const Layout = ({ children }: LayoutProps<"/docs">) => (
  <DocsLayout tree={source.getPageTree()}>{children}</DocsLayout>
);

export default Layout;
