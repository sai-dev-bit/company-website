import React, { useState } from 'react';

const TechnologySection = () => {
  // --- Theme Color Definitions (from Services Section) ---
  const PRIMARY = '#7b104c';
  const PRIMARY_TEXT = 'text-[#7b104c]';
  const PRIMARY_BG = 'bg-[#7b104c]';
  const PRIMARY_LIGHT_BG = 'bg-[#fdf2f7]';
  const PRIMARY_DARK = '#5b0c39';
  // -----------------------------------------------------

  const [activeTool, setActiveTool] = useState('tools-1');

const toolsData = [
    {
      id: 'tools-1',
      name: 'Frontend Engineering',
      description: 'Crafting visually stunning and responsive user interfaces using modern frameworks to ensure a flawless and engaging digital experience on any device.',
      buttonText: 'Explore Frontend Capabilities',
      buttonUrl: '',
      icon: '/assets/frontend-new.svg',
      technologies: [
        { name: 'React', icon: '/assets/react.webp', url: '/services/reactjs-development-services/' },
        { name: 'Next.js', icon: '/assets/Next-js.webp', url: '/services/nextjs-development-services/' },
        { name: 'AngularJS', icon: '/assets/angular-1.webp', url: '/services/angularjs-development-services/' },
        { name: 'Vue.js', icon: '/assets/vue.webp' },
        { name: 'TypeScript', icon: '/assets/typescript.webp' },
        { name: 'HTML5', icon: '/assets/html-5-1.webp', url: '/services/html5-application-development-services/' },
        { name: 'CSS3', icon: '/assets/css-3-1.webp' },
        { name: 'JavaScript', icon: '/assets/js-5.webp' },
        { name: 'Bootstrap', icon: '/assets/bootstrap.webp' }
      ]
    },
    {
      id: 'tools-2',
      name: 'Backend Engineering',
      description: 'We build microservices-driven and secure back-end architectures, ensuring superior security, high performance, and effortless scalability for all applications.',
      buttonText: 'See Backend Solutions',
      buttonUrl: '',
      icon: '/assets/backend-new.svg',
      technologies: [
        { name: 'Python', icon: '/assets/python.webp', url: '/services/python-development-services/' },
        { name: 'Node.js', icon: '/assets/node.webp', url: '/services/nodejs-development-services/' },
        { name: 'Java', icon: '/assets/java.webp', url: '/services/java-development-service/' },
        { name: 'Microsoft .Net', icon: '/assets/dotnet.webp', url: '/services/dotnet-development-services/' },
        { name: 'Django', icon: '/assets/django.webp' },
        { name: 'Flask', icon: '/assets/flask.webp' },
        { name: 'Go', icon: '/assets/Go.webp' },
        { name: 'PHP', icon: '/assets/php-1.webp', url: '/services/php-development-services/' },
        { name: 'Spring', icon: '/assets/spring.webp' },
        { name: 'GraphQL', icon: '/assets/Graph.webp' },
        { name: 'Express.js', icon: '/assets/Expresswebp.webp' },
        { name: 'Lavarel', icon: '/assets/Laravel.webp' }
      ]
    },
    {
      id: 'tools-3',
      name: 'Databases',
      description: 'Implementing high-performance, resilient data storage solutions tailored to develop secure and scalable applications that meet your exact business needs.',
      buttonText: 'View Database Solutions',
      buttonUrl: '',
      icon: '/assets/databases-svg.svg',
      technologies: [
        { name: 'MySQL', icon: '/assets/mysql.webp' },
        { name: 'PostgreSQL', icon: '/assets/postre.webp' },
        { name: 'Oracle DB', icon: '/assets/oracle.webp' },
        { name: 'MongoDB', icon: '/assets/mongo.webp' },
        { name: 'Elastic Search', icon: '/assets/elastic.webp' },
        { name: 'Amazon DynamoDB', icon: '/assets/dynamo.webp' },
        { name: 'Microsoft SQL Server', icon: '/assets/micro-sql-ser.webp' },
        { name: 'Redis', icon: '/assets/redis.webp' },
        { name: 'Algolia', icon: '/assets/algo.webp' },
        { name: 'Cassandra', icon: '/assets/casand.webp' }
      ]
    },
        {
      id: 'tools-4',
      name: 'Generative AI',
      description: 'Leveraging cutting-edge Generative AI and Large Language Models to automate complex tasks, enhance decision-making, and drive innovative business solutions.',
      buttonText: 'Learn About Generative AI',
      buttonUrl: '',
      icon: '/assets/genai-logo.svg',
      technologies: [
        { name: 'Gemini', icon: '/assets/gemini-1.webp' },
        { name: 'Open AI', icon: '/assets/openai.webp' },
        { name: 'ChatGPT', icon: '/assets/chatg.webp' },
        { name: 'KANE AI', icon: '/assets/kane-ai-1.webp', url: '/kane-ai/' },
        { name: 'Microsoft Copilot', icon: '/assets/copilot.webp' },
        { name: 'Claude', icon: '/assets/claude.webp' },
        { name: 'GitHub Copilot', icon: '/assets/github.webp' },
        { name: 'DeepSeek', icon: '/assets/deep.webp' },
        { name: 'Cursor', icon: '/assets/cursor.webp' },
        { name: 'CrewAI', icon: '/assets/Crew-ai.webp' }
      ]
    },
    {
      id: 'tools-5',
      name: 'Quality Engineering',
      description: 'Providing comprehensive QA strategies and automated testing services to ensure rapid, flawless product delivery and maximum application reliability.',
      buttonText: 'Quality Assurance Services',
      buttonUrl: '',
      icon: '/assets/quality-new.svg',
      technologies: [
        { name: 'Selenium', icon: '/assets/ele.webp' },
        { name: 'Playwright', icon: '/assets/play.webp' },
        { name: 'Appium', icon: '/assets/appi.webp' },
        { name: 'Cypress', icon: '/assets/cypress.webp' },
        { name: 'REST Assured', icon: '/assets/rest.webp' },
        { name: 'Postman', icon: '/assets/post.webp' },
        { name: 'Cucumber-JVM', icon: '/assets/cucum.webp' },
        { name: 'Browser Stack', icon: '/assets/browse.webp' },
        { name: 'LoadRunner', icon: '/assets/load.webp' },
        { name: 'Burp Suite', icon: '/assets/burp.webp' },
        { name: 'Nessus', icon: '/assets/ness.webp' },
        { name: 'LambdaTest', icon: '/assets/lamda.webp', url: '/services/lambdatest/' },
      ]
    },
    {
      id: 'tools-6',
      name: 'Digital Experience',
      description: 'Designing and deploying seamless, personalized digital experiences and dynamic commerce solutions to maximize customer engagement and conversion.',
      buttonText: 'Design and UX Services',
      buttonUrl: '',
      icon: '/assets/digital-logo.svg',
      technologies: [
        { name: 'Drupal', icon: '/assets/drup.webp' },
        { name: 'Adobe Commerce', icon: '/assets/adb-com.webp' },
        { name: 'Adobe Experience Manager', icon: '/assets/db-exp.webp' },
        { name: 'Strapi', icon: '/assets/str.webp' },
        { name: 'DRUPAL COMMERCE', icon: '/assets/drp-com.webp' },
        { name: 'Adobe Analytics', icon: '/assets/adb-analyt.webp' },
        { name: 'Google Analytics', icon: '/assets/Google-analytics.webp' },
        { name: 'Adobe Target', icon: '/assets/target.webp' },
        { name: 'Figma', icon: '/assets/fig.webp' },
        { name: 'Adobe XD', icon: '/assets/xd.webp' },
        { name: 'Contentful', icon: '/assets/content.webp' },
        { name: 'WordPress', icon: '/assets/word.webp' }
      ]
    },
    {
      id: 'tools-7',
      name: 'Mobile Development',
      description: 'Specializing in high-performance, user-focused mobile applications across native (iOS/Android) and cross-platform technologies to ensure seamless access anywhere.',
      buttonText: 'Mobile App Solutions',
      buttonUrl: '',
      icon: '/assets/mobile-logo.svg',
      technologies: [
        { name: 'Kotlin', icon: '/assets/kot.webp' },
        { name: 'Swift', icon: '/assets/swift.webp' },
        { name: 'React Native', icon: '/assets/react-nat.webp' },
        { name: 'Flutter', icon: '/assets/flut.webp', url: '/services/flutter-application-development-services/' },
        { name: 'JavaScript', icon: '/assets/js-5.webp' },
        { name: 'Dart', icon: '/assets/dart.webp' }
      ]
    },
    {
      id: 'tools-8',
      name: 'Cloud & DevOps',
      description: 'Streamlining development, integrating security, and accelerating delivery with robust DevSecOps practices and optimized multi-cloud infrastructure solutions.',
      buttonText: 'Cloud & DevOps Consulting',
      buttonUrl: '',
      icon: '/assets/cloud-devops-new.svg',
      technologies: [
        { name: 'AWS', icon: '/assets/aws.webp' },
        { name: 'Azure', icon: '/assets/azur.webp' },
        { name: 'Google Cloud Platform', icon: '/assets/gcp.webp' },
        { name: 'CI CD', icon: '/assets/ci-cd.webp' },
        { name: 'Jenkins', icon: '/assets/jenk.webp' },
        { name: 'Kubernetes', icon: '/assets/kubr.webp' },
        { name: 'Docker', icon: '/assets/dockr.webp' },
        { name: 'HashiCorp Terraform', icon: '/assets/terra.webp' },
        { name: 'Grafana', icon: '/assets/graffa.webp' },
        { name: 'Cloudfare', icon: '/assets/cloudf.webp' },
        { name: 'ELK', icon: '/assets/elk.webp' },
        { name: 'Nginx', icon: '/assets/angi.webp' },
      ]
    },
    {
      id: 'tools-9',
      name: 'Data Engineering',
      description: 'Delivering robust, data-driven solutions using advanced analytics and AI to unlock deep insights, optimize decision-making, and accelerate business growth.',
      buttonText: 'Data Engineering Services',
      buttonUrl: '',
      icon: '/assets/data-science-logo.svg',
      technologies: [
        { name: 'snowflake', icon: '/assets/snow-1.webp' },
        { name: 'ELK', icon: '/assets/elk.webp' },
        { name: 'Kafka', icon: '/assets/kaf.webp' },
        { name: 'databricks', icon: '/assets/datab.webp' },
        { name: 'Apache Airflow', icon: '/assets/airf.webp' },
        { name: 'dbt', icon: '/assets/dbt.webp' },
        { name: 'AWS glue', icon: '/assets/lue.webp' },
        { name: 'Azure datafactory', icon: '/assets/data-f.webp' },
        { name: 'Amazon EMR', icon: '/assets/amazon-em.webp' },
        { name: 'Azure Synapse Analytics', icon: '/assets/synap.webp' },
        { name: 'Amazon Redshift', icon: '/assets/mazon-red.webp' },
        { name: 'Apache Spark', icon: '/assets/spark.webp' }
      ]
    }
  ];

  const activeToolData = toolsData.find(tool => tool.id === activeTool);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[var(--primary-lightest)]) scroll-mt-20" id='technology'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Header */}
        <div className="flex justify-center text-center mb-12 sm:mb-16">
          <div className="max-w-4xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Our Core <span className={PRIMARY_TEXT}>Technology Expertise</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed px-4">
              We leverage a deep, specialized stack across nine critical domains, ensuring we use the right tool for every business challenge.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          
          {/* Left Side - Tools List (Fixed Height on Desktop) */}
          <div className="lg:w-1/3">
            <div className={`bg-white p-4 sm:p-6 shadow-xl border border-gray-200 lg:h-[780px] lg:overflow-y-auto`}>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 border-b pb-3 sm:pb-4 border-gray-100">Development Domains</h3>
              <div className="space-y-1">
                {toolsData.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setActiveTool(tool.id)}
                    className={`w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 transition-all duration-300 text-left border border-transparent 
                      ${
                        activeTool === tool.id
                          ? `${PRIMARY_BG} text-white shadow-lg transform lg:scale-[1.02] border-l-4 border-l-white`
                          : `bg-white text-gray-700 hover:${PRIMARY_LIGHT_BG} hover:text-gray-900`
                      }
                    `}
                    style={{ borderRadius: 0 }}
                  >
                    <img 
                      src={tool.icon} 
                      alt={tool.name}
                      // Invert icon color when active
                      className={`w-6 h-6 sm:w-8 sm:h-8 transition-all duration-300 ${
                        activeTool === tool.id ? 'filter brightness-0 invert' : 'bg-[var(--primary)] p-1 sm:p-2'
                      }`}
                      onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/32x32/ffffff/000000?text=T"; }}
                    />
                    <span className="font-semibold text-base sm:text-lg">{tool.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Content (Fixed Height on Desktop) */}
          <div className="lg:w-2/3">
            <div className="bg-white p-4 sm:p-6 md:p-8 shadow-xl border border-gray-200 lg:h-[780px] flex flex-col" style={{ borderRadius: 0 }}>
              
              {/* Header (Top) */}
              <div className="text-center mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-gray-100">
                <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 ${PRIMARY_TEXT}`}>
                  {activeToolData?.name}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                  {activeToolData?.description}
                </p>
              </div>

              {/* Technologies Grid (Scrollable Content) */}
              <div className="flex-grow no-scrollbar pr-2">
                <div className="tools-icon-list">
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    {activeToolData?.technologies.map((tech, index) => (
                      <div
                        key={index}
                        className={`group flex flex-col items-center p-2 ${PRIMARY_LIGHT_BG} hover:bg-white border border-transparent hover:border-gray-200 transition-all duration-300`}
                        style={{ borderRadius: 0, paddingBottom: '1rem' }}
                      >
                          <div 
                            href={tech.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{display:"grid", placeItems:"center"}}
                          >
                            <img
                              loading="lazy"
                              src={tech.icon}
                              alt={tech.name}
                              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                              title={tech.name}
                              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/80x80/fdf2f7/7b104c?text=T"; }}
                            />
                          </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;