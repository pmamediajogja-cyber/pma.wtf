// BENAR: Memisahkan modul sesuai dengan sumbernya
import { useState } from 'react';
import { motion } from 'framer-motion';

const tools = [
  { name: "React.js", icon: "⚛️", category: "Frontend" },
  { name: "TailwindCSS", icon: "🎨", category: "Styling" },
  { name: "Framer Motion", icon: "🌀", category: "Animation" },
  { name: "Node.js", icon: "🟢", category: "Backend" },
  { name: "Vite", icon: "⚡", category: "Build Tool" },
  { name: "Git & GitHub", icon: "🔀", category: "Version Control" },
  { name: "VS Code", icon: "💻", category: "Editor" },
  { name: "AutoCAD", icon: "📐", category: "Design" },
  { name: "Adobe Suite", icon: "🎬", category: "Creative" },
  { name: "OSS RBA", icon: "📋", category: "Legal System" },
  { name: "SIMBG", icon: "🏗️", category: "Legal System" },
  { name: "ESP32 IoT", icon: "🔧", category: "Hardware" },
  { name: "Linux Server", icon: "🐧", category: "Infrastructure" },
  // Cybersecurity Tools
  { name: "Wireshark", icon: "🐟", category: "Cybersecurity" },
  { name: "Nmap", icon: "🗺️", category: "Cybersecurity" },
  { name: "Metasploit", icon: "☠️", category: "Cybersecurity" },
  { name: "Burp Suite", icon: "🕷️", category: "Cybersecurity" },
  { name: "Kali Linux", icon: "🐉", category: "Cybersecurity" },
  { name: "John the Ripper", icon: "🔓", category: "Cybersecurity" },
  { name: "Aircrack-ng", icon: "📡", category: "Cybersecurity" },
  { name: "Hashcat", icon: "#️⃣", category: "Cybersecurity" },
]

const categories = [...new Set(tools.map(t => t.category))]

const categoryIcons = {
  Frontend: "⚛️", Styling: "🎨", Animation: "🌀", Backend: "🟢",
  'Build Tool': "⚡", 'Version Control': "🔀", Editor: "💻",
  Design: "🖌️", Creative: "🎬", 'Legal System': "📋",
  Hardware: "🔧", Infrastructure: "🐧", Cybersecurity: "🛡️"
}

// Cybersecurity Tools Component
export default function Tools() {
  const [threatLevel, setThreatLevel] = useState('low')
  const [networkStatus, setNetworkStatus] = useState('secure')
  
  // Simulate threat intelligence updates
  // In a real app, you'd use useEffect with proper cleanup
  
  const getThreatColor = (level) => {
    switch (level) {
      case 'low': return '#00ff88'
      case 'medium': return '#ffaa00'
      case 'high': return '#ff5500'
      case 'critical': return '#ff0040'
      default: return '#00f0ff'
    }
  }
  
  const getNetworkColor = (status) => {
    switch (status) {
      case 'secure': return '#00ff88'
      case 'warning': return '#ffaa00'
      case 'compromised': return '#ff0040'
      default: return '#00f0ff'
    }
  }
  
  return (
    <section id="tools" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '50%', height: '50%', background: 'rgba(0,255,136,0.05)', borderRadius: '50%', filter: 'blur(150px)' }} />
      
      {/* Animations for cybersecurity dashboard */}
      <style>{`
        @keyframes flow {
          0% { background-position: 0 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes pulse {
          0% { opacity: 0.6; }
          100% { opacity: 1; }
        }
      `}</style>
      
      {/* CYBERSECURITY DASHBOARD */}
      <div className="container-custom" style={{ position: 'relative', zIndex: 10, marginBottom: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div className="badge badge-pulse" style={{ margin: '0 auto 0.5rem', width: 'fit-content' }}>
            Cyber Threat Intelligence
          </div>
          <h3 className="font-orbitron" style={{ fontSize: '1.5rem', color: '#ffff00', marginBottom: '0.5rem' }}>
            Real-Time Security Monitoring
          </h3>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center', border: `1px solid ${getThreatColor(threatLevel)}20` }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🛡️</div>
            <h4 style={{ color: getThreatColor(threatLevel), marginBottom: '0.5rem' }}>Threat Level</h4>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>{threatLevel.toUpperCase()}</p>
            {/* Threat level indicator bar */}
            <div style={{ 
              height: '4px', 
              background: `linear-gradient(90deg, 
                ${getThreatColor(threatLevel)} 0%, 
                ${getThreatColor(threatLevel)} 
                ${threatLevel === 'low' ? '33%' : threatLevel === 'medium' ? '66%' : '100%'}, 
                #1a1a1a 
                ${threatLevel === 'low' ? '33%' : threatLevel === 'medium' ? '66%' : '100%'} 
                100%
              )`, 
              marginTop: '0.5rem',
              borderRadius: '2px'
            }}></div>
          </div>
          
          <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center', border: `1px solid ${getNetworkColor(networkStatus)}20` }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🌐</div>
            <h4 style={{ color: getNetworkColor(networkStatus), marginBottom: '0.5rem' }}>Network Status</h4>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>{networkStatus.toUpperCase()}</p>
            {/* Network status indicator */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              marginTop: '0.5rem',
              gap: '0.5rem'
            }}>
              {[1, 2, 3, 4].map((i, index) => (
                <div 
                  key={index}
                  style={{ 
                    width: '6px', 
                    height: '6px', 
                    background: networkStatus === 'secure' 
                      ? '#00ff88' 
                      : networkStatus === 'warning' 
                        ? '#ffaa00' 
                        : '#ff0040',
                    borderRadius: '50%',
                    opacity: index < 
                      (networkStatus === 'secure' ? 4 : 
                       networkStatus === 'warning' ? 2 : 1)
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⚡</div>
            <h4 style={{ color: '#00f0ff', marginBottom: '0.5rem' }}>Threats Blocked</h4>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>{Math.floor(Math.random() * 1000)}</p>
            {/* Mini sparkline for threats blocked */}
            <div style={{ 
              height: '12px', 
              marginTop: '0.5rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                background: `linear-gradient(
                  90deg, 
                  transparent 0%, 
                  transparent 20%, 
                  #00f0ff 20%, 
                  #00f0ff 40%, 
                  transparent 40%, 
                  transparent 60%, 
                  #00f0ff 60%, 
                  #00f0ff 80%, 
                  transparent 80%, 
                  transparent 100%
                )`,
                backgroundSize: '200% 100%',
                backgroundPosition: '0 0',
                animation: 'flow 2s linear infinite'
              }}></div>
            </div>
          </div>
          
          <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔐</div>
            <h4 style={{ color: '#ff00e5', marginBottom: '0.5rem' }}>Vulnerabilities Patched</h4>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>{Math.floor(Math.random() * 50)}</p>
            {/* Progress bar for patching */}
            <div style={{ 
              height: '6px', 
              background: 'rgba(255,255,255,0.1)', 
              borderRadius: '3px', 
              marginTop: '0.5rem',
              overflow: 'hidden'
            }}>
              <div style={{ 
                width: `${Math.min(Math.random() * 100, 95)}%`, 
                height: '100%', 
                background: `linear-gradient(90deg, #ff00e5, #ff00ff)`, 
                borderRadius: '3px',
                animation: 'pulse 2s ease-in-out infinite alternate'
              }}></div>
            </div>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button 
            onClick={() => {
              // Simulate updating threat intelligence
              setThreatLevel(['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)])
              setNetworkStatus(['secure', 'warning', 'compromised'][Math.floor(Math.random() * 3)])
            }}
            className="btn-outline"
            style={{ 
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(45deg, transparent, rgba(0,240,255,0.1), transparent)',
              backgroundSize: '200% 200%',
              backgroundPosition: '0 0'
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>
              🔄 Update Threat Intelligence
            </span>
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, transparent 0%, transparent 40%, rgba(0,240,255,0.1) 45%, rgba(0,240,255,0.2) 50%, transparent 55%, transparent 100%)',
              transform: 'rotate(0deg)',
              animation: 'rotate 4s linear infinite'
            }}></div>
          </button>
          
          <div style={{ marginTop: '0.75rem', fontSize: 10, color: '#6b7280', maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
            <p>📊 Simulated real-time threat intelligence dashboard</p>
          </div>
        </div>
      </div>
      
      <div className="container-custom" style={{ position: 'relative', zIndex: 10 }}>
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="badge badge-success" style={{ margin: '0 auto 1rem', width: 'fit-content' }}>
            Tech Stack
          </div>
          <h2 className="font-orbitron" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>
            Tools & <span className="text-gradient">Technologies</span>
          </h2>
          <p style={{ color: '#6b7280' }}>A versatile arsenal spanning IT, legal systems, creative media, and development</p>
          <div style={{ width: 80, height: 4, background: 'linear-gradient(90deg, #00f0ff, #7b2ff7, #00ffff, #ff00ff)', margin: '1rem auto 0', borderRadius: 2 }} />
        </div>

        {/* All Tools Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2, staggerChildren: 0.05 } }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
            gap: '16px',
            marginBottom: '3rem'
          }}>
            {tools.map((tool, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.05 * i } }}
                whileHover={{ 
                  y: -6, 
                  scale: 1.03, 
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)' 
                }}
                whileTap={{ scale: 0.95 }}
                className="glass-card"
                style={{ padding: '1rem', textAlign: 'center', cursor: 'default' }}
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: [0, 5, 0, -5, 0] }}
                  whileTap={{ scale: 0.9 }}
                  style={{ fontSize: '2rem', marginBottom: '0.5rem' }}
                >
                  {tool.icon}
                </motion.div>
                <h4 style={{ fontSize: 13, color: 'white', fontWeight: 500 }}>{tool.name}</h4>
                <p style={{ fontSize: 11, color: '#6b7280', marginTop: 4 }}>{tool.category}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* By Category */}
        <div>
          <h3 className="font-orbitron" style={{ fontSize: '1.25rem', color: '#ffff00', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            ⚡ Categorized Stack
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {categories.map(cat => (
              <div key={cat} className="glass-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{categoryIcons[cat] || '📦'}</span>
                  <h4 className="font-orbitron" style={{ fontSize: 12, color: 'white' }}>{cat}</h4>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {tools.filter(t => t.category === cat).map((tool, j) => (
                    <span key={j} style={{
                      padding: '6px 12px', borderRadius: 8, fontSize: 12,
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#9ca3af'
                    }}>
                      {tool.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}