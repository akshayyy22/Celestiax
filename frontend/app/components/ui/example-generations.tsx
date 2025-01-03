const VideoItem = ({
    src,
    poster,
    title,
    repoUrl,
    commits,
}: {
    src: string;
    poster: string;
    title: string;
    repoUrl: string;
    commits: string;
}) => (
    <div className="flex flex-col">
      <div className="rounded-xl border-[1.5px] border-white/10 bg-black overflow-hidden aspect-[16/9]">
        <iframe
          src={src}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title={title}
        />
      </div>
      <div className="mt-3 flex justify-between items-center">
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-transparent bg-clip-text bg-gradient-to-t from-blue-400 to-blue-600 hover:from-blue-300 hover:to-blue-500 transition-all duration-300"
        >
          {title}
        </a>
        <span className="text-sm text-gray-400">{commits} transactions per day</span>
      </div>
    </div>
);

const videos = [
  {
    src: "https://drive.google.com/file/d/15-iEpEuFa1okjo43nDBxDGTM16izyv1L/preview",
    poster: "/example-photo/bitcoin-example-photo.png",
    title: "Bitcoin",
    repoUrl: "https://bitcoin.org/en/",
    commits: "393,242+",
  },
  {
    src: "https://drive.google.com/file/d/1aQVU6C7ze1t8MA_aDsQRL1BoqbpinIxm/preview",
    poster: "/example-photo/ethereum-example-photo.png",
    title: "Ethereum",
    repoUrl: "https://ethereum.org/en/",
    commits: "1.1 billion",
  },
  {
    src: "https://drive.google.com/file/d/1w9TsKXU0BO-tzJ5dFMEDZHyPi2RbQQhg/preview",
    poster: "/example-photo/algorand-example-photo.png",
    title: "Algorand",
    repoUrl: "https://xrpl.org/",
    commits: "1.4 million",
  },
];

export default function ExampleGenerations() {
  return (
    <div className="flex flex-col mx-auto w-full pt-11 space-y-5">
      <h2 className="text-2xl font-semibold text-left">Example Visualization</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {videos.map((video, index) => (
          <VideoItem key={index} {...video} />
        ))}
      </div>
    </div>
  );
}
