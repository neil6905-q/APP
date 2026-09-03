import React, { useState } from 'react';
import { 
  GraduationCap, 
  UserCheck, 
  Users, 
  Calendar, 
  Clock, 
  ChevronRight, 
  CheckCircle2, 
  ArrowLeft, 
  Send, 
  MessageCircle, 
  Briefcase, 
  BookOpen, 
  ShieldCheck,
  Award,
  Building2,
  FileText,
  BadgeCheck,
  Search
} from 'lucide-react';
import { UserProfile } from '../types';
import { WHATSAPP_DISPLAY, WHATSAPP_PHONE } from '../data/products';
import { GoogleIcon } from './GoogleIcon';

interface MentorshipSectionProps {
  currentUser: UserProfile | null;
  onOpenAuth: (promptMsg?: string) => void;
  onBackToStore: () => void;
  onBackToPortal?: () => void;
}

interface Mentor {
  id: string;
  name: string;
  title: string;
  credential: string;
  specialty: 'nutricion' | 'conducta' | 'negocios';
  specialtyLabel: string;
  experience: string;
  avatar: string;
  description: string;
  topics: string[];
  sessionDuration: string;
  pricePEN: number;
}

const MENTORS: Mentor[] = [
  {
    id: 'm1',
    name: 'Dra. Valeria Montes',
    title: 'Médica Veterinaria Especialista en Nutrición Clínica & Dietas Naturales',
    credential: 'Col. M.V. N° 8492 • Postgrado en Nutrición Funcional',
    specialty: 'nutricion',
    specialtyLabel: 'Nutrición Clínica Veterinaria',
    experience: '8 años de ejercicio clínico',
    avatar: 'https://images.unsplash.com/photo-1594824813576-932d0ff84179?w=300&auto=format&fit=crop&q=80',
    description: 'Asesoría clínica personalizada para transición segura a dietas mixtas/BARF, evaluación de tolerancia gastrointestinal, prevención articular y prescripción de masticables ricos en glucosamina.',
    topics: [
      'Transición gradual a alimentación natural y masticables',
      'Protección articular, colágeno y salud osteomuscular',
      'Manejo de alergias digestivas y sensibilidades alimentarias'
    ],
    sessionDuration: '45 min • Sesión Privada',
    pricePEN: 50.00
  },
  {
    id: 'm2',
    name: 'Lic. Carlos Benavides',
    title: 'Etólogo Canino Clínico & Especialista en Bienestar y Masticación',
    credential: 'Certificación Internacional en Modificación de Conducta',
    specialty: 'conducta',
    specialtyLabel: 'Etología & Modificación de Conducta',
    experience: '6 años en rehabilitación etológica',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    description: 'Diagnóstico y abordaje científico de trastornos conductuales: reducción de cortisol mediante masticación prolongada, ansiedad por separación y enriquecimiento ambiental estructurado.',
    topics: [
      'Protocolos de masticación para reducción de estrés y ansiedad',
      'Tratamiento de ansiedad por soledad y separación',
      'Establecimiento de rutinas y límites en el hogar'
    ],
    sessionDuration: '45 min • Sesión Privada',
    pricePEN: 45.00
  },
  {
    id: 'm3',
    name: 'Ing. Renzo Arana, M.B.A.',
    title: 'Consultor Senior en Pet Retail, Finanzas & Distribución B2B',
    credential: 'MBA en Dirección de Empresas • 10 años en Pet Commerce',
    specialty: 'negocios',
    specialtyLabel: 'Estrategia Comercial & Pet Retail',
    experience: '10 años en dirección comercial pet',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    description: 'Consultoría estratégica dirigida a veterinarias, pet shops y emprendedores: optimización de márgenes con lotes mayoristas, exhibición en punto de venta y fidelización recurrente.',
    topics: [
      'Estructuración de márgenes en compras mayoristas y packs',
      'Merchandising y empaque para maximizar rotación',
      'Estrategia de pricing y captación de clientes de alto valor'
    ],
    sessionDuration: '50 min • Asesoría Ejecutiva',
    pricePEN: 40.00
  }
];

export const MentorshipSection: React.FC<MentorshipSectionProps> = ({
  currentUser,
  onOpenAuth,
  onBackToStore,
  onBackToPortal,
}) => {
  // Role selection: null = formal entrance screen, 'cliente' | 'mentor'
  const [role, setRole] = useState<'cliente' | 'mentor' | null>(null);

  // Client booking state
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [bookingTopic, setBookingTopic] = useState('');
  const [patientOrEntity, setPatientOrEntity] = useState(currentUser?.dogName || '');
  const [clientPhone, setClientPhone] = useState(currentUser?.phone || '');
  const [preferredDate, setPreferredDate] = useState('');
  const [consultationObjective, setConsultationObjective] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Mentor registration state
  const [mentorName, setMentorName] = useState(currentUser?.fullName || '');
  const [mentorEmail, setMentorEmail] = useState(currentUser?.email || '');
  const [mentorPhone, setMentorPhone] = useState(currentUser?.phone || '');
  const [mentorCredential, setMentorCredential] = useState('');
  const [mentorSpecialty, setMentorSpecialty] = useState('Nutrición Clínica Veterinaria');
  const [mentorExperienceYears, setMentorExperienceYears] = useState('3 a 5 años');
  const [mentorHourlyFee, setMentorHourlyFee] = useState('S/ 50.00');
  const [mentorDossier, setMentorDossier] = useState('');
  const [mentorApplicationSuccess, setMentorApplicationSuccess] = useState(false);

  // Filter client mentors
  const [filterSpecialty, setFilterSpecialty] = useState<'todos' | 'nutricion' | 'conducta' | 'negocios'>('todos');

  const filteredMentors = MENTORS.filter(m => {
    if (filterSpecialty === 'todos') return true;
    return m.specialty === filterSpecialty;
  });

  const handleOpenBooking = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setBookingTopic(mentor.topics[0]);
    setBookingSuccess(false);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentor) return;

    const clientName = currentUser ? currentUser.fullName : 'Consultante Registrado';
    const entityText = patientOrEntity ? `📋 Paciente / Empresa: ${patientOrEntity}` : '📋 Paciente / Empresa: No especificado';
    const dateText = preferredDate ? `📅 Franja Horaria Propuesta: ${preferredDate}` : '📅 Horario: A coordinar';
    const objText = consultationObjective ? `🎯 Objetivo Específico: ${consultationObjective}` : '';

    const msg = `*SOLICITUD FORMAL DE ASESORÍA ESPECIALIZADA - FARY MERK ADVISORY*\n\n` +
      `🏛️ *Consultor Requerido:* ${selectedMentor.name}\n` +
      `🎖️ *Especialidad:* ${selectedMentor.specialtyLabel}\n` +
      `👤 *Consultante:* ${clientName}\n` +
      `📱 *Contacto WhatsApp:* ${clientPhone || 'No especificado'}\n` +
      `${entityText}\n` +
      `📑 *Tema Principal:* ${bookingTopic}\n` +
      `${objText ? objText + '\n' : ''}` +
      `${dateText}\n` +
      `💳 *Arancel:* S/ ${selectedMentor.pricePEN.toFixed(2)} (${selectedMentor.sessionDuration})\n\n` +
      `_Agradeceré confirmar la disponibilidad de agenda y el enlace seguro de sesión._`;

    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
    setBookingSuccess(true);
  };

  const handleMentorApplication = (e: React.FormEvent) => {
    e.preventDefault();

    const msg = `*EXPEDIENTE DE POSTULACIÓN - PANEL DE CONSULTORES FARY MERK*\n\n` +
      `👨‍💼 *Postulante:* ${mentorName}\n` +
      `✉️ *Correo Institucional / Personal:* ${mentorEmail}\n` +
      `📱 *Teléfono:* ${mentorPhone}\n` +
      `🎓 *Colegiatura / Acreditación:* ${mentorCredential || 'En proceso'}\n` +
      `🏛️ *Área de Especialidad:* ${mentorSpecialty}\n` +
      `⏳ *Tiempo de Ejercicio:* ${mentorExperienceYears}\n` +
      `💰 *Honorarios Propuestos:* ${mentorHourlyFee}\n` +
      `📄 *Resumen de Trayectoria:* ${mentorDossier || 'Documentación a remitir'}\n\n` +
      `_Solicito formalmente la evaluación de mi perfil profesional para integrarme al panel consultivo._`;

    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
    setMentorApplicationSuccess(true);
  };

  // ==========================================
  // VIEW A: FORMAL ENTRANCE PRESENTATION
  // (MÁS FORMAL, MENOS TIERNA, ESTILO CORPORATIVO/ACADÉMICO)
  // ==========================================
  if (!role) {
    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        {/* Formal Institutional Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B132B] via-[#1C2541] to-[#0F172A] text-white p-6 sm:p-8 shadow-xl border border-slate-800">
          {/* Subtle architectural backdrop accents */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/90 border border-amber-400/30 text-amber-300 text-[11px] font-bold tracking-wide uppercase">
              <BadgeCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Fary Merk Advisory Services • División Consultoría</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif tracking-tight text-white leading-tight">
              Centro de Mentorías & Consultoría Profesional
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal max-w-xl">
              Programa de asesoría especializada 1 a 1 de alto nivel técnico. Diseñado para brindar orientación clínica veterinaria, etología basada en evidencia y consultoría de escalamiento para empresas del ecosistema pet.
            </p>

            {/* Quality and Compliance Indicators */}
            <div className="pt-4 mt-2 border-t border-slate-700/70 flex flex-wrap items-center gap-4 text-[11px] text-slate-300">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Especialistas Colegiados y Certificados</span>
              </div>
              <span className="text-slate-600">•</span>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Consultoría B2B y Clínica Privada</span>
              </div>
              <span className="text-slate-600">•</span>
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Confidencialidad Garantizada (Ley N° 29733)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="px-1">
          <h2 className="text-sm font-black uppercase tracking-wider text-slate-700 font-serif">
            Modalidad de Ingreso al Programa
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Seleccione la vía de acceso correspondiente a su perfil e interés:
          </p>
        </div>

        {/* Two Formal Windows of Access */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* OPTION 1: SOLICITAR ASESORÍA (ACCESO CLIENTE / CONSULTANTE) */}
          <div
            id="mentorship-enter-client"
            onClick={() => setRole('cliente')}
            className="group cursor-pointer rounded-3xl bg-white hover:bg-slate-50/80 border-2 border-slate-200 hover:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between p-6 sm:p-7 relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold shadow-md shadow-slate-900/10 group-hover:scale-105 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-800 px-2.5 py-1 rounded-full border border-slate-200">
                  Acceso Consultante
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 font-serif">
                  Solicitar Asesoría Especializada
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Para tutores de mascotas exigentes, criadores y directores de pet shops. Acceda a sesiones privadas de 45-50 minutos en nutrición clínica, etología correctiva y estructuración de compras comerciales.
                </p>
              </div>

              {/* Pillars list */}
              <div className="space-y-2 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dietas funcionales y transición segura a masticables naturales</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Manejo de ansiedad y enriquecimiento conductual</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Escalamiento comercial y márgenes mayoristas para negocios</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-black text-slate-900 group-hover:text-amber-700 transition-colors">
              <span>Explorar Directorio de Consultores</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* OPTION 2: POSTULAR AL PANEL (ACCESO MENTOR / ESPECIALISTA) */}
          <div
            id="mentorship-enter-mentor"
            onClick={() => setRole('mentor')}
            className="group cursor-pointer rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 text-white hover:border-amber-400 border-2 border-slate-800 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between p-6 sm:p-7 relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full border border-amber-400/30">
                  Convocatoria Profesional
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black text-white font-serif">
                  Postular al Panel de Consultores
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Convocatoria abierta para Médicos Veterinarios colegiados, etólogos certificados y consultores comerciales en el rubro de animales de compañía. Integre nuestra red institucional con remuneración profesional.
                </p>
              </div>

              {/* Pillars list */}
              <div className="space-y-2 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Plataforma institucional con gestión de citas y pagos</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Exposición profesional ante una comunidad de miles de tutores</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Horarios flexibles con honorarios fijados por el especialista</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-black text-amber-400 group-hover:text-amber-300 transition-colors">
              <span>Presentar Expediente de Homologación</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Institutional Quality Statement */}
        <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
          <ShieldCheck className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-slate-800">Estándar de Calidad Profesional:</strong> Todos los profesionales que forman parte del panel de Fary Merk Advisory son sujetos a validación de títulos académicos, registro en colegios profesionales y verificación de antecedentes técnicos, garantizando un servicio ético y de máxima rigurosidad.
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW B: CLIENT DIRECTORY (FORMAL, REFINED)
  // ==========================================
  if (role === 'cliente') {
    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        {/* Navigation bar */}
        <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-200 text-xs">
          <button
            type="button"
            onClick={() => setRole(null)}
            className="inline-flex items-center gap-1.5 font-bold text-slate-700 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a la selección de modalidad</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-500">
              Modo: <strong className="text-slate-800">Directorio de Consultores</strong>
            </span>
            <button
              type="button"
              onClick={onBackToStore}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
            >
              Ir a Snacks
            </button>
          </div>
        </div>

        {/* Formal Header */}
        <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
              Directorio de Consultores Acreditados
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-serif text-white">
              Panel de Especialistas Fary Merk
            </h2>
            <p className="text-xs text-slate-300">
              Seleccione al especialista de acuerdo con su objetivo clínico, conductual o comercial.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs bg-slate-800/80 px-3 py-2 rounded-xl border border-slate-700 text-slate-200 shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Colegiaturas Verificadas</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-nowrap text-xs">
          <button
            type="button"
            onClick={() => setFilterSpecialty('todos')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              filterSpecialty === 'todos'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Todos los Consultores
          </button>
          <button
            type="button"
            onClick={() => setFilterSpecialty('nutricion')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              filterSpecialty === 'nutricion'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Nutrición Clínica
          </button>
          <button
            type="button"
            onClick={() => setFilterSpecialty('conducta')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              filterSpecialty === 'conducta'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Etología & Conducta
          </button>
          <button
            type="button"
            onClick={() => setFilterSpecialty('negocios')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              filterSpecialty === 'negocios'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Pet Retail & Negocios
          </button>
        </div>

        {/* Mentor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-400 transition-all space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-300 shadow-xs shrink-0"
                  />
                  <div>
                    <h3 className="text-sm font-black text-slate-900 leading-snug">
                      {mentor.name}
                    </h3>
                    <span className="text-[11px] text-amber-700 font-bold block">
                      {mentor.specialtyLabel}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                      {mentor.credential}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {mentor.description}
                </p>

                {/* Topics Covered */}
                <div className="space-y-1 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Áreas de Abordaje:
                  </span>
                  <ul className="space-y-1">
                    {mentor.topics.map((topic, idx) => (
                      <li key={idx} className="text-[11px] text-slate-700 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Pricing and Action */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Honorarios de consulta:</span>
                  <div className="text-base font-black text-slate-900">
                    S/ {mentor.pricePEN.toFixed(2)}
                    <span className="text-[10px] font-normal text-slate-500 ml-1">
                      / {mentor.sessionDuration}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  id={`mentor-btn-agendar-${mentor.id}`}
                  onClick={() => handleOpenBooking(mentor)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 active:scale-95"
                >
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Agendar</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Formal Booking Form */}
        {selectedMentor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">
                      Coordinación de Sesión con {selectedMentor.name}
                    </h3>
                    <span className="text-[11px] text-amber-700 font-bold">
                      {selectedMentor.specialtyLabel}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedMentor(null)}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              {bookingSuccess ? (
                <div className="py-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-black text-slate-900">
                    Solicitud de Asesoría Generada
                  </h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Hemos abierto la coordinación directa por WhatsApp para validar la agenda de {selectedMentor.name} y remitirle los detalles de conexión.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedMentor(null)}
                    className="mt-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold"
                  >
                    Cerrar y volver al directorio
                  </button>
                </div>
              ) : (
                <form onSubmit={handleConfirmBooking} className="space-y-3.5 text-xs">
                  {/* Summary Box */}
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Modalidad & Duración</span>
                      <span className="font-bold text-slate-900">{selectedMentor.sessionDuration}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block">Arancel Profesional</span>
                      <span className="font-black text-slate-900">S/ {selectedMentor.pricePEN.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Topic Select */}
                  <div className="space-y-1">
                    <label className="font-bold text-slate-800">
                      Área temática prioritaria:
                    </label>
                    <select
                      value={bookingTopic}
                      onChange={(e) => setBookingTopic(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"
                    >
                      {selectedMentor.topics.map((topic, i) => (
                        <option key={i} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Patient or Business Name */}
                  <div className="space-y-1">
                    <label className="font-bold text-slate-800">
                      Nombre del paciente (perrito) o negocio comercial:
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Thor (Golden 3 años) o Pet Shop San Borja"
                      value={patientOrEntity}
                      onChange={(e) => setPatientOrEntity(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"
                    />
                  </div>

                  {/* WhatsApp Phone */}
                  <div className="space-y-1">
                    <label className="font-bold text-slate-800">
                      Número telefónico de contacto (WhatsApp):
                    </label>
                    <input
                      type="tel"
                      placeholder="Ej: 999 888 777"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"
                    />
                  </div>

                  {/* Preferred Date */}
                  <div className="space-y-1">
                    <label className="font-bold text-slate-800">
                      Disponibilidad horaria preferida (Días / Turnos):
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Lunes o Miércoles por las tardes (4pm - 7pm)"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"
                    />
                  </div>

                  {/* Specific objective */}
                  <div className="space-y-1">
                    <label className="font-bold text-slate-800">
                      Detalles o antecedentes clínicos/comerciales breves:
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Indique brevemente diagnósticos previos, síntomas o metas comerciales a abordar..."
                      value={consultationObjective}
                      onChange={(e) => setConsultationObjective(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>Confirmar y Enviar Solicitud por WhatsApp Oficial</span>
                    </button>
                    <p className="text-[10px] text-slate-400 text-center mt-1.5">
                      Se canalizará mediante el canal oficial Fary Merk para validación de agenda y emisión de comprobante.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // VIEW C: MENTOR APPLICATION (FORMAL DOSSIER)
  // ==========================================
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Navigation bar */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-200 text-xs">
        <button
          type="button"
          onClick={() => setRole(null)}
          className="inline-flex items-center gap-1.5 font-bold text-slate-700 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver a la selección de modalidad</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-500">
            Modo: <strong className="text-slate-800">Convocatoria de Consultores</strong>
          </span>
          <button
            type="button"
            onClick={onBackToStore}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            Ir a Snacks
          </button>
        </div>
      </div>

      {/* Formal Header */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-5 sm:p-7 shadow-lg border border-slate-800 space-y-2">
        <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded border border-amber-400/30">
          Comité Evaluador Fary Merk
        </span>
        <h2 className="text-xl sm:text-2xl font-black font-serif text-white">
          Postulación al Panel Oficial de Consultores
        </h2>
        <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
          Complete la siguiente ficha formal para la acreditación técnica de su perfil. Nuestro equipo evaluará sus credenciales para incorporarlo al directorio activo de consultoría y mentoría.
        </p>
      </div>

      {mentorApplicationSuccess ? (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-3 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-black text-slate-900">
            Expediente de Postulación Transmitido
          </h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            Hemos registrado su solicitud y redirigido los datos al canal institucional de homologación. Nuestro equipo de coordinación se contactará en un plazo máximo de 48 horas hábiles.
          </p>
          <div className="pt-3">
            <button
              type="button"
              onClick={() => setRole(null)}
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
            >
              Volver al Centro de Mentorías
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleMentorApplication} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-800">
                Nombres y Apellidos Completos:
              </label>
              <input
                type="text"
                value={mentorName}
                onChange={(e) => setMentorName(e.target.value)}
                required
                placeholder="Ej: Dr. Manuel Alarcón"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-slate-900 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800">
                Número de Colegiatura o Registro Profesional:
              </label>
              <input
                type="text"
                value={mentorCredential}
                onChange={(e) => setMentorCredential(e.target.value)}
                placeholder="Ej: Col. Méd. Vet. N° 9812 / Certificación Int."
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-slate-900 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-800">
                Correo Electrónico de Contacto:
              </label>
              <input
                type="email"
                value={mentorEmail}
                onChange={(e) => setMentorEmail(e.target.value)}
                required
                placeholder="ejemplo@profesional.com"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-slate-900 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800">
                Teléfono / WhatsApp Profesional:
              </label>
              <input
                type="tel"
                value={mentorPhone}
                onChange={(e) => setMentorPhone(e.target.value)}
                required
                placeholder="Ej: 987 654 321"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-slate-900 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-800">
                Área de Especialidad Principal:
              </label>
              <select
                value={mentorSpecialty}
                onChange={(e) => setMentorSpecialty(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-slate-900 focus:outline-none"
              >
                <option value="Nutrición Clínica Veterinaria">Nutrición Clínica Veterinaria</option>
                <option value="Etología y Modificación de Conducta">Etología y Conducta Canina</option>
                <option value="Estrategia Comercial y Pet Retail">Estrategia Comercial & Pet Retail</option>
                <option value="Medicina Veterinaria General y Preventiva">Medicina Preventiva General</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800">
                Años de Ejercicio Profesional:
              </label>
              <select
                value={mentorExperienceYears}
                onChange={(e) => setMentorExperienceYears(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-slate-900 focus:outline-none"
              >
                <option value="1 a 3 años">1 a 3 años</option>
                <option value="3 a 5 años">3 a 5 años</option>
                <option value="5 a 10 años">5 a 10 años</option>
                <option value="Más de 10 años">Más de 10 años</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800">
                Honorario Estimado por Sesión (PEN):
              </label>
              <input
                type="text"
                value={mentorHourlyFee}
                onChange={(e) => setMentorHourlyFee(e.target.value)}
                placeholder="Ej: S/ 50.00"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-slate-900 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-800">
              Resumen Curricular / Enfoque Técnico:
            </label>
            <textarea
              rows={3}
              value={mentorDossier}
              onChange={(e) => setMentorDossier(e.target.value)}
              placeholder="Describa brevemente su formación de postgrado, certificaciones, publicaciones o casuística de especialidad..."
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-slate-900 focus:outline-none resize-none"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
            <span>
              Los antecedentes proporcionados serán tratados con estricta reserva conforme a la <strong>Ley N° 29733 de Protección de Datos Personales</strong>, únicamente para fines del proceso de homologación institucional.
            </span>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-amber-400" />
              <span>Remitir Expediente al Comité Evaluador por WhatsApp</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
