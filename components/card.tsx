interface Props {
  title: string;
  body: string;
  href: string;
}

const Card: React.FC<Props> = ({ href, title, body }) => {
  return (
    <main>
      <li className="list-none flex p-0.5 bg-[#23262d] rounded-lg transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]">
        <a
          className="w-full no-underline text-white bg-[#23262d] opacity-80 rounded-lg p-[calc(1.5rem-1px)] cursor-pointer"
          href={href}
        >
          <h2 className="m-0 text-1.25rem transition-colors duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]">
            {title}
            <span>&rarr;</span>
          </h2>
          <p className="mt-2 mb-0">{body}</p>
        </a>
      </li>
    </main>
  );
};

export default Card;