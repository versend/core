import { SiteHeader } from "@/components/site/site-header";

const Layout = ({ children }: LayoutProps<"/">) => (
  <>
    <SiteHeader />
    <main className="flex flex-1 flex-col">{children}</main>
  </>
);

export default Layout;
