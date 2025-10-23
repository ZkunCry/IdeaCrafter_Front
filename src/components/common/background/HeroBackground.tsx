const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-subtle" />
      <div className="absolute top-20 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />

      <div className="absolute inset-0 bg-grid" />

      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default HeroBackground;
