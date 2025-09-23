export default function Introduction() {
  return (
    <section className="min-h-screen flex items-center px-4 sm:px-6 lg:px-[0px] py-[20.25px]">
      <div className="w-full lg:w-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          <div className="flex-1 w-full lg:w-auto">
            <div className="mb-8 w-full lg:w-[490px] lg:h-[271.375px]">
              <h1
                id="intro-heading"
                className="intro-heading font-bold static-white py-[0px] px-[10px] lg:px-[15] mb-[21.75px] text-4xl sm:text-5xl md:text-6xl lg:text-[60px] text-left lg:mr-1 lg:h-[150px] leading-tight break-words"
              >
                Hi, I'm <span className="text-primary">Kaiden Pollesch</span>
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-2xl xl:text-3xl static-white mb-8">
                Software Engineer | Cybersecurity
              </h2>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="px-[0px] text-base sm:text-lg static-white leading-relaxed max-w-2xl">
                As a software engineering student with a focus on cybersecurity, I am driven by a passion for making a real impact on how people work. I love developing tools and systems that improve efficiency and simplify complex processes. By combining my technical skills with a user-centric approach, I aim to create solutions that are not only powerful but also intuitive. Explore my projects to see how I translate this passion into tangible results.
              </p>
            </div>
          </div>

          <div className="flex-shrink-0">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary shadow-2xl">
              <img
                src="/kaiden-pollesch.jpg"
                alt="Kaiden Pollesch - Professional Headshot"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}