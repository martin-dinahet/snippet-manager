"use client";

import { useSnippetsContext } from "@/components/custom/SnippetsProvider";

const Page = (): React.JSX.Element => {
  const { snippets, uniqueTags, error, loading } = useSnippetsContext();

  return (
    <>
      <div className="min-h-screen"></div>
    </>
  );
};

export default Page;
