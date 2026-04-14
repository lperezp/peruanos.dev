"use client";

import { useState } from 'react';

const ENDPOINTS = [
  {
    id: "events",
    method: "GET",
    path: "/api/events",
    title: "/api/events",
    description: "Obtiene la lista de todos los eventos tecnológicos registrados, incluyendo meetups, conferencias, talleres y hackathons en Perú.",
    filters: ["city=lima", "type=presencial"],
    fetchCode: "fetch('https://peruanos.dev/api/events?city=lima&type=presencial')\n  .then(res => res.json())\n  .then(data => console.log(data))",
    jsonSnippet: `data = [
  {
    "title": "Hackathon Lima 2024",
    "date": "2024-11-15T09:00:00Z",
    "location": "Lima, Perú",
    "link": "https://hackathonlima.pe",
    "organizer": "Comunidad Tech Perú"
  },
  // ...
]`
  },
  {
    id: "communities",
    method: "GET",
    path: "/api/communities",
    title: "/api/communities",
    description: "Obtiene el directorio completo de comunidades activas, grupos y organizaciones tech peruanas.",
    filters: ["city=lima"],
    fetchCode: "fetch('https://peruanos.dev/api/communities?city=lima')\n  .then(res => res.json())\n  .then(data => console.log(data))",
    jsonSnippet: `data = [
  {
    "name": "React Lima",
    "description": "Comunidad de desarrolladores React y React Native en Lima.",
    "website": "https://reactlima.pe",
    "social": {
      "twitter": "https://twitter.com/reactlima",
      "github": "https://github.com/reactlima"
    }
  },
  // ...
]`
  },
  {
    id: "projects",
    method: "GET",
    path: "/api/projects",
    title: "/api/projects",
    description: "Obtiene el showcase de proyectos open source creados y mantenidos por desarrolladores peruanos.",
    filters: [],
    fetchCode: "fetch('https://peruanos.dev/api/projects')\n  .then(res => res.json())\n  .then(data => console.log(data))",
    jsonSnippet: `data = [
  {
    "name": "peruanos.dev",
    "description": "Plataforma open source de la comunidad tech en Perú.",
    "repo_url": "https://github.com/peruanos-dev/peruanos.dev",
    "language": "TypeScript",
    "stars": 128
  },
  // ...
]`
  }
];

function highlightJSON(line: string) {
  let colored = line.replace(/(".*?"):/g, '<span class="text-blue-300">$1</span>:');
  colored = colored.replace(/: ("(.*?)")/g, ': <span class="text-emerald-300">$1</span>');
  colored = colored.replace(/data = /, '<span class="text-pink-400">data</span> = ');
  colored = colored.replace(new RegExp("(//.*)", "g"), '<span class="text-gray-500">$1</span>');
  return colored;
}

export default function ApiDocsViewer() {
  const [activeTab, setActiveTab] = useState(ENDPOINTS[0].id);

  const activeEndpoint = ENDPOINTS.find((ep) => ep.id === activeTab) || ENDPOINTS[0];
  const urlSnippet = activeEndpoint.fetchCode.split("'")[1] || "";

  return (
    <div className="w-full flex justify-center mt-12 mb-20 relative">
      <div className="w-full max-w-5xl rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col md:flex-row bg-[#0B0F19]/80 backdrop-blur-xl">

        <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/10 flex flex-col p-4 md:p-6 gap-2 relative z-10 bg-black/20">
          {ENDPOINTS.map((endpoint) => {
            const isActive = activeTab === endpoint.id;
            return (
              <div
                key={endpoint.id}
                onClick={() => setActiveTab(endpoint.id)}
                className={`cursor-pointer group flex flex-col p-4 rounded-xl transition-all duration-300 relative overflow-hidden ${isActive
                  ? "bg-white/10 shadow-inner"
                  : "hover:bg-white/5 transparent"
                  }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-red-500 rounded-r-md"></div>
                )}

                <h3 className={`font-mono text-sm tracking-wide font-semibold mb-1 transition-colors ${isActive ? 'text-red-400' : 'text-gray-300 group-hover:text-red-300'}`}>
                  {endpoint.title}
                </h3>
                <p className={`text-xs leading-relaxed transition-colors ${isActive ? 'text-gray-300' : 'text-gray-500 group-hover:text-gray-400'}`}>
                  {endpoint.description}
                </p>
                {isActive && endpoint.filters.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {endpoint.filters.map(filter => (
                      <span key={filter} className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                        {filter}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="w-full md:w-2/3 p-4 md:p-8 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-orange-600/10 pointer-events-none"></div>
          <div className="relative h-full flex flex-col gap-6">
            <div className="mt-6 md:mt-4">
              <pre className="text-gray-300 font-mono text-[13px] md:text-sm overflow-x-auto p-4 rounded-xl bg-black/40 border border-white/5 whitespace-pre-wrap break-words shadow-inner">
                <span className="text-pink-400">fetch</span>
                <span className="text-blue-300">(</span>
                <span className="text-emerald-300">{"'"}{urlSnippet}{"'"}</span>
                <span className="text-blue-300">)</span>
                {"\n"}
                <span className="text-gray-400">  .</span><span className="text-yellow-200">then</span><span className="text-blue-300">(</span><span className="text-orange-300">res</span> <span className="text-pink-400">{"=>"}</span> <span className="text-orange-300">res</span><span className="text-gray-400">.</span><span className="text-yellow-200">json</span><span className="text-blue-300">())</span>
                {"\n"}
                <span className="text-gray-400">  .</span><span className="text-yellow-200">then</span><span className="text-blue-300">(</span><span className="text-orange-300">data</span> <span className="text-pink-400">{"=>"}</span> <span className="text-blue-300">console</span><span className="text-gray-400">.</span><span className="text-yellow-200">log</span><span className="text-blue-300">(</span><span className="text-orange-300">data</span><span className="text-blue-300">))</span>
              </pre>
            </div>
            <div className="flex bg-black/40 border border-white/5 rounded-xl shadow-inner overflow-hidden">
              <div className="min-w-[40px] pt-4 pb-4 md:flex hidden flex-col items-end px-3 border-r border-white/5 text-gray-600 font-mono text-[13px] text-right select-none">
                {activeEndpoint.jsonSnippet.split('\n').map((_, i) => (
                  <span key={i} className="block leading-relaxed">{i + 1}</span>
                ))}
              </div>
              <pre className="p-4 overflow-x-auto text-gray-300 font-mono text-[13px] md:text-sm leading-relaxed w-full">
                {activeEndpoint.jsonSnippet.split('\n').map((line, idx) => {
                  const html = highlightJSON(line) || ' ';
                  return (
                    <div key={idx} dangerouslySetInnerHTML={{ __html: html }} className="whitespace-pre"></div>
                  );
                })}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
