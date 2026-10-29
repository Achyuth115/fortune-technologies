import { ServiceItem } from '../types/index.ts';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'projector-service',
    title: 'Projector service',
    category: 'optics',
    categoryBadge: 'PRECISION OPTICS',
    startingPrice: 999,
    shortDesc:
      'Component-level bench diagnostics, optical path de-dusting, ballast voltage stabilization, DMD micro-mirror restoration, and 4K/laser lumen calibration.',
    fullDesc:
      'Fortune Technologies provides authorized-grade component repair for home cinema, educational, and commercial projectors. Our cleanroom laboratory diagnoses DLP chips, LCD prism blocks, laser phosphor engines, and ballast power supplies rather than relying on costly whole-assembly swaps.',
    image: '/images/services/projector-service.jpg',
    iconName: 'Projector',
    whatsIncluded: [
      'Cleanroom optical engine dust extraction and precision multi-coated lens cleaning',
      'DMD chip micro-mirror alignment, thermal pad replacement, and silver paste repasting',
      'High-voltage ballast power supply ripple testing and capacitor health check',
      'Color wheel bearing inspection, RPM balancing, and optical sensor recalibration',
      '24-Hour continuous thermal burn-in stress test with lumen lux output verification',
    ],
    configurations: [
      {
        id: 'proj-clean',
        name: 'Basic Optical Engine Cleaning & De-dusting',
        price: 999,
        isDefault: true,
      },
      {
        id: 'proj-thermal',
        name: 'Full Thermal Overhaul & Fan Array Bearing Service',
        price: 1999,
      },
      {
        id: 'proj-lamp',
        name: 'OEM Lamp / Bulb Replacement & Ballast Calibration',
        price: 3499,
      },
      {
        id: 'proj-dmd',
        name: 'DMD Chip Micro-Mirror Replacement & Motherboard Soldering',
        price: 5999,
      },
      {
        id: 'proj-laser',
        name: 'Laser Phosphor Engine Re-alignment & Prism Block Tuning',
        price: 7999,
      },
    ],
    brands: ['BenQ', 'Epson', 'Sony', 'Optoma', 'ViewSonic', 'Barco', 'Christie', 'Panasonic'],
  },
  {
    id: 'home-theater',
    title: 'Home theater setup & repair',
    category: 'audio',
    categoryBadge: 'CINEMA & ACOUSTICS',
    startingPrice: 1499,
    shortDesc:
      'Acoustic room calibration, Dolby Atmos speaker alignment, AV receiver channel diagnostics, discrete transistor repairs, and HDMI 2.1 eARC troubleshooting.',
    fullDesc:
      'Complete home cinema engineering and repair services. From troubleshooting multi-channel amplifier protection modes and distorted subwoofer voice coils to acoustic boundary tuning and structural ceiling speaker rigging, we restore pristine cinematic immersion.',
    image: '/images/services/home-theater.jpg',
    iconName: 'Tv',
    whatsIncluded: [
      'Multi-channel AV receiver circuit diagnostics and output transistor testing',
      'Dolby Atmos & DTS:X speaker geometry angle alignment and microphone room EQ tuning',
      'Subwoofer low-frequency phase alignment and room boundary resonance cancellation',
      'In-wall 4K/8K 48Gbps HDMI cable signal testing, EDID handshake, and rack wire dressing',
      'Master universal remote integration and AV automation preset programming',
    ],
    configurations: [
      {
        id: 'ht-calib',
        name: '5.1 / 7.1 Speaker Geometry Alignment & Acoustic EQ Tuning',
        price: 1499,
        isDefault: true,
      },
      {
        id: 'ht-receiver-repair',
        name: 'AV Receiver Diagnostic & Protect Mode Circuit Repair',
        price: 2499,
      },
      {
        id: 'ht-dolby-atmos',
        name: 'Dolby Atmos In-Ceiling Speaker Rigging & Cable Concealment',
        price: 4999,
      },
      {
        id: 'ht-amp-recap',
        name: 'High-End Discrete Amplifier Transistor & Capacitor Re-cap',
        price: 6499,
      },
      {
        id: 'ht-full-cinema',
        name: 'Full High-End Dedicated Cinema Room Commissioning & Calibration',
        price: 9999,
      },
    ],
    brands: ['Denon', 'Marantz', 'Yamaha', 'Onkyo', 'Bose', 'Klipsch', 'KEF', 'JBL Synthesis', 'Anthem'],
  },
  {
    id: 'server-repair',
    title: "Server's Repair",
    category: 'enterprise',
    categoryBadge: 'ENTERPRISE SERVER',
    startingPrice: 2499,
    shortDesc:
      'Rackmount server motherboard micro-soldering, redundant hot-swap PSU refurbishing, hardware RAID rebuilds, enterprise thermal overhauls, and BMC firmware recovery.',
    fullDesc:
      'Enterprise-grade diagnostic and hardware repair facility for mission-critical servers, blade enclosures, and SAN/NAS storage arrays. We service enterprise Xeon and EPYC platforms, addressing power delivery phase failures, degraded RAID storage pools, and out-of-band management faults.',
    image: '/images/services/server-repair.jpg',
    iconName: 'Server',
    whatsIncluded: [
      'Multi-socket server motherboard SMD VRM power phase repair and trace rework',
      'Redundant hot-swap power supply load bank testing and capacitor reconditioning',
      'Hardware RAID controller cache battery diagnostics and array volume recovery',
      'High-CFM server fan module refurbishment and liquid/heat-pipe thermal re-pasting',
      'BMC / IPMI firmware corruption recovery and hardware health telemetry validation',
    ],
    configurations: [
      {
        id: 'srv-diagnostic',
        name: 'Rackmount Server Diagnostic & Deep Thermal Maintenance',
        price: 2499,
        isDefault: true,
      },
      {
        id: 'srv-psu',
        name: 'Redundant Power Supply (PSU) Circuit Repair & Load Testing',
        price: 3999,
      },
      {
        id: 'srv-raid',
        name: 'Hardware RAID Controller & Degraded Storage Pool Recovery',
        price: 5499,
      },
      {
        id: 'srv-board',
        name: 'Dual-Socket Xeon / EPYC Motherboard Micro-Soldering',
        price: 8999,
      },
      {
        id: 'srv-san',
        name: 'Enterprise SAN / NAS Storage Enclosure Hardware Servicing',
        price: 11999,
      },
    ],
    brands: ['Dell PowerEdge', 'HPE ProLiant', 'Lenovo ThinkSystem', 'Supermicro', 'Cisco UCS', 'Synology RackStation'],
  },
  {
    id: 'laptop-desktop',
    title: 'Laptop & Desktop Repair',
    category: 'computing',
    categoryBadge: 'CHIP-LEVEL HARDWARE',
    startingPrice: 499,
    shortDesc:
      'Chip-level motherboard repair, liquid spill ultrasonic de-corrosion, GPU/CPU BGA reballing, broken display hinge restoration, and high-speed NVMe/RAM upgrades.',
    fullDesc:
      'Comprehensive chip-level computer workstation and laptop repair center. Whether your gaming laptop suffered a liquid spill, your ultrabook has broken display hinges, or your desktop motherboard won’t power on, our technicians provide precise microscopic soldering and diagnostic tracing.',
    image: '/images/services/laptop-desktop-repair.jpg',
    iconName: 'Laptop',
    whatsIncluded: [
      'Schematic trace inspection with FLIR thermal imaging to pinpoint shorted capacitors',
      'High-precision BGA chip rework, GPU reballing, and corrupted BIOS EEPROM reflashing',
      'Genuine high-refresh OLED, 144Hz/240Hz, and 4K display panel replacements',
      'Ultrasonic bath treatment for liquid-damaged boards to eliminate micro-corrosion',
      'Phase-change liquid metal or high-density thermal paste application for zero throttling',
    ],
    configurations: [
      {
        id: 'comp-thermal',
        name: 'General Internal Thermal Cleaning & Fan De-scaling',
        price: 499,
        isDefault: true,
      },
      {
        id: 'comp-hinge',
        name: 'Broken Display Hinge & Structural Bezel Re-fabrication',
        price: 1299,
      },
      {
        id: 'comp-power',
        name: 'Motherboard Short Circuit & Power IC Chip-Level Repair',
        price: 2799,
      },
      {
        id: 'comp-liquid',
        name: 'Liquid Spill Recovery & Ultrasonic De-corrosion Bath',
        price: 3299,
      },
      {
        id: 'comp-bga',
        name: 'High-End Gaming Laptop GPU / CPU BGA Reballing',
        price: 4499,
      },
    ],
    brands: ['Apple MacBook', 'Dell XPS / Alienware', 'HP Spectre / Omen', 'Lenovo ThinkPad / Legion', 'ASUS ROG', 'MSI', 'Acer Predator'],
  },
  {
    id: 'cctv-installation',
    title: 'CCTV Camera installation',
    category: 'security',
    categoryBadge: 'SECURITY & SURVEILLANCE',
    startingPrice: 799,
    shortDesc:
      'Professional dome & bullet camera installation, 4K NVR network configuration, infrared night-vision focal tuning, neat conduit cabling, and mobile app live streaming.',
    fullDesc:
      'End-to-end electronic security and video surveillance systems for residential, commercial, and industrial premises. We handle blind-spot acoustic planning, weatherproof IP67 conduit cable runs, NVR storage optimization, and secure encrypted remote mobile app access.',
    image: '/images/services/cctv-camera.jpg',
    iconName: 'Camera',
    whatsIncluded: [
      'Strategic site survey to eliminate blind spots and plan lens focal angles',
      'Pure copper CAT6 PoE structured cabling with weatherproof protective conduit routing',
      '4K NVR hard drive configuration with H.265+ smart motion detection and continuous recording',
      'Day/Night IR infrared and ColorVu full-color night vision optical alignment',
      'Encrypted mobile app setup on iOS and Android for live view, two-way audio, and playback',
    ],
    configurations: [
      {
        id: 'cctv-single',
        name: 'Single Camera Relocation, Alignment & Network Re-link',
        price: 799,
        isDefault: true,
      },
      {
        id: 'cctv-remote',
        name: 'NVR Remote Viewing Network Setup & Cloud Bridge Configuration',
        price: 1499,
      },
      {
        id: 'cctv-4ch',
        name: '4-Channel 1080p / 2K IP PoE Complete System Installation',
        price: 2999,
      },
      {
        id: 'cctv-colorvu',
        name: 'Full Color 24/7 Night Vision Upgrade (Up to 4 Cameras)',
        price: 4299,
      },
      {
        id: 'cctv-8ch',
        name: '8-Channel 4K Ultra-HD Commercial Surveillance Setup & Conduit',
        price: 5499,
      },
    ],
    brands: ['Hikvision', 'CP Plus', 'Dahua', 'Uniview', 'Bosch', 'Axis Communications', 'Honeywell'],
  },
];
