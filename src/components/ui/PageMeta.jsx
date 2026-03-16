import { Helmet } from "react-helmet-async";

const PageMeta = ({ title, description, canonical }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    {canonical && <link rel="canonical" href={canonical} />}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
  </Helmet>
);

export default PageMeta;
