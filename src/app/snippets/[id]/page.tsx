import React from "react";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: Props): Promise<React.JSX.Element> => {
  const { id } = await params;

  return (
    <>
      <h1>{id}</h1>
    </>
  );
};

export default Page;
