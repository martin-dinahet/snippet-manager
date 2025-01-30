import { SnippetsProvider } from "@/components/custom/SnippetsProvider";

const SnippetsLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <SnippetsProvider>{children}</SnippetsProvider>;
};

export default SnippetsLayout;
