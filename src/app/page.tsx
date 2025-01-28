"use client";

import { useSnippetsContext } from "@/components/custom/SnippetsProvider";

const Page: React.FC = (): React.JSX.Element => {
  const { snippets, uniqueTags, error, loading } = useSnippetsContext();

  return (
    <>
      <div className="w-screen min-h-screen"></div>
    </>
  );
};

export default Page;
