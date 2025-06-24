import fs from 'fs'
import path from 'path'
import Image from 'next/image'
import Link from 'next/link'
import PortoLayout from '../PortoLayout'

interface Project {
  id: string
  title: string
  description: string
  imageUrl: string
  projectUrl: string
}

function getProjects(): Project[] {
  const filePath = path.join(process.cwd(), 'data', 'projects.json')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(fileContents)
}

export default function Projects() {
  const projects = getProjects()

  return (
    <PortoLayout>
      <div className="max-w-4xl mx-auto min-h-screen">
        <div className="space-y-2 mb-16">
          <h1 className="text-5xl font-bold text-gray-900">Projects</h1>
          <p className="text-xl text-gray-600">A showcase of my recent work</p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="bg-gray-50 overflow-hidden rounded-lg border border-gray-200 transition-all duration-200 hover:border-gray-300 hover:shadow-lg">
                <div className="relative h-48 w-full">
                  <Image
                    src={project.imageUrl || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">{project.title}</h3>
                  <p className="mt-2 text-gray-600">{project.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PortoLayout>
  )
}

