const Page = () => {
  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      data: {},
    },
  };
};

export default Page;
