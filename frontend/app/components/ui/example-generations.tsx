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
      <div className="rounded-xl border-[1.5px] border-white/10 bg-black overflow-hidden aspect-[16/10]">
        <video
          className="w-full h-full object-cover"
          controls
          muted
          playsInline
          preload="metadata"
          poster={poster}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
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
      src: "/example-video/bitcoin-example.mp4",
      poster: "/example-generations/apple_swift.png",
      title: "Bitcoin",
      repoUrl: "https://bitcoin.org/en/",
      commits: "393,242+",
    },
    {
      src: "/example-video/ethereum-example.mp4",
      poster: "/example-generations/serenityos_serenity.png",
      title: "Ethereum",
      repoUrl: "https://ethereum.org/en/",
      commits: "1.1 billion",
    },
    {
      src: "/example-video/algorand-example.mp4",
      poster: "/example-generations/facebook_react.png",
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