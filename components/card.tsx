interface Props {
  title: string;
  body: string;
  href: string;
}

const Card: React.FC<Props> = ({ href, title, body }) => {
  return (
    <main>
      <li className="flex list-none rounded-lg bg-gray-800 p-0.5 shadow-inner">
        <a
          className="opaity-80 w-full cursor-pointer rounded-lg bg-gray-800 p-6 text-white hover:opacity-100 focus:opacity-100"
          href={href}
        >
          <h2 className="m-0 text-xl">
            {title}
            <span> →</span>
          </h2>
          <p className="mb-0 mt-2">{body}</p>
        </a>
      </li>
    </main>
  );
};

export default Card;
