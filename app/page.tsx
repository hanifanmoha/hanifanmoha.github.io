import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Image from 'next/image'
import PortoLayout from './PortoLayout'

interface Experience {
  company: string
  position: string
  duration: string
  location: string
  description?: string[]
  skills: string[]
}

interface Education {
  degree: string
  institution: string
  location: string
  year: string
  courses: string[]
  finalProjects: {
    title: string
    link: string | null
  }[]
}

interface Certification {
  title: string
  issuer: string
  year: string
  link?: string
}

interface PortfolioData {
  name: string
  title: string
  bio?: string
  experience: Experience[]
  education: Education[]
  certifications?: Certification[]
}

function getPortfolioData(): PortfolioData {
  const filePath = path.join(process.cwd(), 'data', 'portfolio.json')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(fileContents)
}

export default function Home() {
  const portfolioData = getPortfolioData()

  return (
    <PortoLayout>
      <div className="max-w-4xl mx-auto">
        <div className="space-y-2 mb-16">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative w-20 h-20 rounded-full overflow-hidden">
                <Image
                  src="https://avatars.githubusercontent.com/u/25604357"
                  alt="Profile picture"
                  fill
                  className="object-cover"
                />
              </div>
              <h1 className="text-5xl font-bold text-gray-900">{portfolioData.name}</h1>
            </div>
          </div>
          <p className="text-xl text-gray-600">{portfolioData.title}</p>
        </div>

        <div className="space-y-16">
          {portfolioData.bio && <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">About</h2>
            <p className="text-gray-600 text-lg leading-relaxed">{portfolioData.bio}</p>
          </section>}

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Experience</h2>
            <div className="space-y-12">
              {portfolioData.experience.map((exp, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{exp.company}</h3>
                      <p className="text-gray-600 mt-1">{exp.position}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600">{exp.duration}</p>
                      <p className="text-gray-500 mt-1">{exp.location}</p>
                    </div>
                  </div>
                  {exp.description && <ul className="mt-4 space-y-2 text-gray-600">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>}
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, i) => (
                        <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Education</h2>
            <div className="space-y-12">
              {portfolioData.education.map((edu, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{edu.institution}</h3>
                      <p className="text-gray-600 mt-1">{edu.degree}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600">{edu.year}</p>
                      <p className="text-gray-500 mt-1">{edu.location}</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Courses</h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {edu.courses.map((course, i) => (
                          <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Final Projects</h4>
                      {edu.finalProjects.map((project, i) => (
                        <div key={i} className="mt-2">
                          {project.link ? (
                            <Link
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              {project.title} →
                            </Link>
                          ) : (
                            <p className="text-gray-600">{project.title}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {portfolioData.certifications && <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Certifications</h2>
            <div className="space-y-8">
              {portfolioData.certifications.map((cert, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{cert.title}</h3>
                      <p className="text-gray-600 mt-1">{cert.issuer}</p>
                    </div>
                    <p className="text-gray-600">{cert.year}</p>
                  </div>
                  {cert.link && (
                    <Link
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800"
                    >
                      View certificate →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>}
        </div>
      </div>
    </PortoLayout>
  )
}

