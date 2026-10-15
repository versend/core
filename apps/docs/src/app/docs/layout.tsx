import { DocsLayout } from "@/components/docs-shell/docs-layout";
import { source } from "@/lib/source";

const Layout = ({ children }: LayoutProps<"/docs">) => (
  <DocsLayout tree={source.getPageTree()}>{children}</DocsLayout>
);

export default Layout;
