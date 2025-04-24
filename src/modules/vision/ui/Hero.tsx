export function Hero() {
  return (
    <section className="py-12 px-4 mt-20">
      <div className="mx-auto max-w-7xl text-center">
        <h1
          className="mx-auto max-w-3xl text-5xl font-extrabold tracking-tight sm:text-6xl animate-fadeIn opacity-0 text-gray-900 dark:text-white"
        >
          <span className="relative inline-block animate-float">
            <span
              className="animate-text bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 bg-clip-text text-transparent"
            >
              Vision AI
            </span>
            <span
              className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-300 opacity-50 blur-lg animate-glow"
            ></span>
          </span>
        </h1>
        <p
          className="mx-auto mt-6 max-w-2xl text-base sm:text-lg animate-slideUp opacity-0 text-gray-700 dark:text-gray-300"
          style={{ animationDelay: "0.5s" }}
        >
          Una herramienta 
          <span
            className="animate-text bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 bg-clip-text text-transparent font-semibold"
          >
            {" inteligente "}
          </span>
          que simplifica el proceso de describir imágenes y convertirlas en audio
          <span className="font-semibold"> con IA.</span>
        </p>
      </div>
    </section>
  );
}
