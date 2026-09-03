import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  FileText, 
  Eye, 
  UserCheck, 
  Database, 
  AlertCircle, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Scale, 
  Truck,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { WHATSAPP_DISPLAY, WHATSAPP_PHONE } from '../data/products';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacidad' | 'terminos' | 'arco' | 'envios';
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacidad',
}) => {
  const [activeTab, setActiveTab] = useState<'privacidad' | 'terminos' | 'arco' | 'envios'>(initialTab);
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('neilq6905@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-stone-900/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 p-5 sm:p-6 text-white shrink-0 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-black font-serif text-white">
                    Políticas de Privacidad & Términos Legales
                  </h2>
                  <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                    Ley N° 29733 Perú
                  </span>
                </div>
                <p className="text-xs text-stone-300 mt-0.5">
                  Protección de Datos Personales, Garantías del Consumidor y Comercio Seguro Fary Merk
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0"
              title="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Section Navigation Tabs */}
          <div className="flex items-center gap-1.5 mt-4 pt-2 border-t border-white/10 overflow-x-auto text-nowrap">
            <button
              type="button"
              onClick={() => setActiveTab('privacidad')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'privacidad'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-white/5 text-stone-300 hover:bg-white/10'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Privacidad & Datos</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('arco')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'arco'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-white/5 text-stone-300 hover:bg-white/10'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Derechos ARCO</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('terminos')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'terminos'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-white/5 text-stone-300 hover:bg-white/10'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Términos y Condiciones</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('envios')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'envios'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-white/5 text-stone-300 hover:bg-white/10'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Envíos & Devoluciones</span>
            </button>
          </div>
        </div>

        {/* Modal Body / Scrollable Content */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-stone-700 text-xs sm:text-sm leading-relaxed">
          {activeTab === 'privacidad' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* Introduction Banner */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-950 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <strong className="block font-bold mb-0.5">Compromiso de Privacidad y Cumplimiento Normativo</strong>
                  En <strong>Fary Merk</strong> (comercio especializado en alimentos y snacks deshidratados naturales para mascotas), tratamos su información personal con estricto apego a la <strong>Ley N° 29733 (Ley de Protección de Datos Personales del Perú)</strong> y su Reglamento aprobado por <strong>Decreto Supremo N° 003-2013-JUS</strong>.
                </div>
              </div>

              {/* 1. Responsable del Tratamiento */}
              <section className="space-y-2">
                <h3 className="text-sm sm:text-base font-extrabold text-stone-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs font-black">1</span>
                  Identidad y Domicilio del Responsable del Banco de Datos
                </h3>
                <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200 text-xs space-y-1.5">
                  <p><strong>Razón Comercial:</strong> FARY MERK • Snacks Deshidratados para Mascotas</p>
                  <p><strong>Actividad:</strong> Venta y distribución minorista y mayorista de masticables y snacks deshidratados 100% naturales para caninos.</p>
                  <p><strong>Ubicación:</strong> Lima, República del Perú.</p>
                  <p><strong>Correo Oficial de Protección de Datos:</strong> neilq6905@gmail.com</p>
                  <p><strong>Canal Oficial de Atención Telefónica / WhatsApp:</strong> {WHATSAPP_DISPLAY} (+{WHATSAPP_PHONE})</p>
                </div>
              </section>

              {/* 2. Datos Personales Recopilados */}
              <section className="space-y-2">
                <h3 className="text-sm sm:text-base font-extrabold text-stone-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs font-black">2</span>
                  Datos Personales que Recopilamos y Origen
                </h3>
                <p>
                  Recopilamos únicamente los datos necesarios para brindar una experiencia de compra eficiente y segura:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>
                    <strong>Autenticación con Google Identity:</strong> Cuando el usuario inicia sesión con Google, se recopilan de manera segura su nombre completo, dirección de correo electrónico ({'<correo>@gmail.com'}) y fotografía pública de perfil (avatar). No solicitamos ni accedemos a contraseñas personales de Google, correos privados de Gmail ni archivos de Drive.
                  </li>
                  <li>
                    <strong>Datos de Contacto y Envío:</strong> Número telefónico/WhatsApp, dirección exacta de domicilio o punto de entrega, distrito, departamento y referencias geográficas.
                  </li>
                  <li>
                    <strong>Datos de la Mascota:</strong> Nombre de su perrito (destinado opcionalmente a incluir un obsequio o dedicatoria sorpresa personalizada en su empaque).
                  </li>
                  <li>
                    <strong>Datos de Transacción:</strong> Método de pago elegido (Yape, Plin o Tarjeta), constancias de abono voluntarias y código único de tracking generado (<code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-[11px]">FMK-XXXXXX</code>).
                  </li>
                </ul>
              </section>

              {/* 3. Finalidades del Tratamiento */}
              <section className="space-y-2">
                <h3 className="text-sm sm:text-base font-extrabold text-stone-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs font-black">3</span>
                  Finalidades Determinadas y Explícitas
                </h3>
                <p>
                  Sus datos personales son tratados con las siguientes finalidades primarias y legítimas:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs space-y-1">
                    <strong className="text-stone-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Gestión de Pedidos & Despacho
                    </strong>
                    <p className="text-stone-600">
                      Coordinar la preparación, empaque higiénico y entrega física de los snacks en su domicilio o agencia de envíos.
                    </p>
                  </div>

                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs space-y-1">
                    <strong className="text-stone-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Autenticación y Prevención de Fraude
                    </strong>
                    <p className="text-stone-600">
                      Verificar la identidad del comprador mediante Google Identity para garantizar que solo el titular confirme transacciones.
                    </p>
                  </div>

                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs space-y-1">
                    <strong className="text-stone-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Seguimiento en Tiempo Real
                    </strong>
                    <p className="text-stone-600">
                      Permitir que consulte las fases de su pedido mediante el código de rastreo y reciba comprobantes por WhatsApp.
                    </p>
                  </div>

                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs space-y-1">
                    <strong className="text-stone-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Historial de Compras Personales
                    </strong>
                    <p className="text-stone-600">
                      Permitir que el cliente visualice en su perfil los productos adquiridos anteriormente y solicite repetición de compra rápida.
                    </p>
                  </div>
                </div>
              </section>

              {/* 4. No Comercialización ni Cesión a Terceros */}
              <section className="space-y-2">
                <h3 className="text-sm sm:text-base font-extrabold text-stone-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs font-black">4</span>
                  Cláusula de No Comercialización ni Cesión Indiscriminada
                </h3>
                <p>
                  <strong>Fary Merk NO VENDE, NO CEDE, NO ALQUILA NI COMERCIALIZA</strong> bajo ninguna circunstancia sus datos personales a terceros con fines publicitarios, bases de telemercadeo masivo o spam.
                </p>
                <p className="text-xs text-stone-500">
                  Únicamente tendrán acceso a los datos de despacho el personal de empaque y los operadores logísticos (couriers de confianza o motorizados de entrega) indispensables para llevar los productos hasta su puerta.
                </p>
              </section>

              {/* 5. Almacenamiento Local (Local Storage) */}
              <section className="space-y-2">
                <h3 className="text-sm sm:text-base font-extrabold text-stone-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs font-black">5</span>
                  Almacenamiento Local en el Dispositivo del Usuario
                </h3>
                <p>
                  Nuestra plataforma no utiliza cookies invasivas de rastreo publicitario de terceros. Utiliza la tecnología nativa de <code className="bg-stone-100 px-1.5 py-0.5 rounded text-[11px] font-mono">localStorage</code> del navegador del usuario con el exclusivo fin técnico de:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>Preservar el carrito de compras ante recargas de página.</li>
                  <li>Mantener la sesión autenticada con Google en su propio navegador.</li>
                  <li>Recordar las preferencias de visualización e historial de órdenes recientes en su equipo.</li>
                </ul>
              </section>
            </div>
          )}

          {activeTab === 'arco' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-blue-950 flex items-start gap-3">
                <UserCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <strong className="block font-bold mb-0.5">Ejercicio Libre y Gratuito de Derechos ARCO</strong>
                  De conformidad con el Título III de la Ley N° 29733, usted como titular de datos personales tiene el derecho irrenunciable a acceder, rectificar, cancelar y oponerse al tratamiento de su información.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-2xl space-y-1">
                  <span className="text-xs font-black uppercase text-orange-600">A • Acceso</span>
                  <p className="text-xs text-stone-600">
                    Derecho a conocer qué información personal suya se encuentra registrada en nuestros sistemas y con qué propósitos específicos.
                  </p>
                </div>

                <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-2xl space-y-1">
                  <span className="text-xs font-black uppercase text-orange-600">R • Rectificación</span>
                  <p className="text-xs text-stone-600">
                    Derecho a solicitar la corrección, actualización o inclusión de sus datos si estos resultasen inexactos, erróneos o incompletos.
                  </p>
                </div>

                <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-2xl space-y-1">
                  <span className="text-xs font-black uppercase text-orange-600">C • Cancelación (Supresión)</span>
                  <p className="text-xs text-stone-600">
                    Derecho a exigir la eliminación o supresión total de sus datos personales cuando hayan dejado de ser necesarios o cuando revoque su consentimiento.
                  </p>
                </div>

                <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-2xl space-y-1">
                  <span className="text-xs font-black uppercase text-orange-600">O • Oposición</span>
                  <p className="text-xs text-stone-600">
                    Derecho a oponerse en cualquier momento al tratamiento de sus datos por motivos legítimos y fundados.
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-amber-950 space-y-3">
                <h4 className="text-xs sm:text-sm font-extrabold flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-amber-700" />
                  <span>¿Cómo ejercer sus Derechos ARCO o solicitar la eliminación de su cuenta?</span>
                </h4>
                <p className="text-xs leading-relaxed">
                  Para ejercer cualquiera de estos derechos, basta con enviar una solicitud simple indicando su nombre completo, el correo electrónico registrado y el derecho que desea ejercer:
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                  <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-amber-300 font-mono text-xs flex-1">
                    <span>neilq6905@gmail.com</span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="ml-2 text-stone-500 hover:text-stone-900 flex items-center gap-1 text-[11px] font-sans font-bold"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedEmail ? 'Copiado' : 'Copiar'}</span>
                    </button>
                  </div>

                  <a
                    href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hola Fary Merk, deseo ejercer mis derechos ARCO respecto a mis datos registrados.')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>WhatsApp ({WHATSAPP_DISPLAY})</span>
                  </a>
                </div>

                <p className="text-[11px] text-amber-800 italic">
                  Las solicitudes de derechos ARCO son atendidas dentro del plazo máximo legal establecido por la Ley N° 29733 (hasta 20 días hábiles para acceso y hasta 10 días hábiles para rectificación, cancelación u oposición).
                </p>
              </div>
            </div>
          )}

          {activeTab === 'terminos' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-stone-900 space-y-2">
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-orange-600" />
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                    Términos de Compra & Contratación Electrónica
                  </h4>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Al navegar, registrarse con Google o efectuar compras en la plataforma de <strong>Fary Merk</strong>, el usuario declara haber leído, comprendido y aceptado en su totalidad las presentes condiciones:
                </p>
              </div>

              <div className="space-y-3.5">
                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-stone-900 mb-1">
                    1. Capacidad Legal
                  </h5>
                  <p className="text-xs text-stone-600">
                    El servicio está destinado exclusivamente a personas mayores de 18 años con plena capacidad jurídica para celebrar contratos de compraventa según las leyes peruanas.
                  </p>
                </div>

                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-stone-900 mb-1">
                    2. Calidad e Inocuidad de los Productos
                  </h5>
                  <p className="text-xs text-stone-600">
                    Todos los snacks (patas de pollo, cuellos, orejas de cerdo y tráqueas de res) son elaborados mediante procesos artesanales de deshidratación lenta a baja temperatura. Son productos 100% de origen animal, libres de químicos, harinas, sal agregada, azúcares y conservantes sintéticos.
                  </p>
                </div>

                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-stone-900 mb-1">
                    3. Precios y Moneda
                  </h5>
                  <p className="text-xs text-stone-600">
                    Todos los precios publicados en la plataforma están expresados en Moneda Nacional (Soles - PEN) e incluyen los tributos aplicables. Los precios por mayor se aplican automáticamente según la presentación y cantidad seleccionada.
                  </p>
                </div>

                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-stone-900 mb-1">
                    4. Métodos de Pago y Coordinación
                  </h5>
                  <p className="text-xs text-stone-600">
                    El usuario puede optar por:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-stone-600 mt-1">
                    <li><strong>Yape o Plin (Pago Contra Entrega):</strong> Se abona directamente al momento de recibir el pedido físico mediante el número oficial <strong>{WHATSAPP_DISPLAY}</strong>.</li>
                    <li><strong>Tarjeta de Débito o Crédito:</strong> Procesado a través de pasarela con cifrado SSL de 256 bits sin retención de datos sensibles en servidores abiertos.</li>
                  </ul>
                </div>

                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-stone-900 mb-1">
                    5. Ausencia de Testimonios Falsos y Publicidad Engañosa
                  </h5>
                  <p className="text-xs text-stone-600">
                    En cumplimiento del <strong>Decreto Legislativo N° 1044 (Ley de Represión de la Competencia Desleal)</strong> y la <strong>Ley N° 29571 (Código de Protección y Defensa del Consumidor)</strong>, Fary Merk no publica testimonios ficticios, opiniones manipuladas ni calificaciones simuladas. Todas las características nutricionales y beneficios corresponden a la composición biológica y natural del snack ofertado.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'envios' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-950 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-700" />
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                    Política de Envíos, Plazos y Garantía
                  </h4>
                </div>
                <p className="text-xs text-emerald-900">
                  Entregamos snacks frescos con empaque sellado herméticamente para preservar el colágeno y la textura crujiente.
                </p>
              </div>

              <div className="space-y-3.5 text-xs text-stone-600">
                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-stone-900 mb-1">
                    1. Cobertura y Tiempos de Despacho
                  </h5>
                  <p>
                    • <strong>Lima Metropolitana y Callao:</strong> Entrega estimada en 24 a 48 horas hábiles tras la confirmación de la orden.<br />
                    • <strong>Provincias del Perú:</strong> Despacho vía agencias de encomienda certificadas (Olva Courier, Shalom u operadores equivalentes) en 48 a 72 horas hábiles.
                  </p>
                </div>

                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-stone-900 mb-1">
                    2. Garantía de Inocuidad y Reclamos
                  </h5>
                  <p>
                    Al tratarse de alimentos para mascotas de consumo seguro, si el paquete llegase con el sello violado, empaque roto por manipulación del courier o cualquier anomalía organoléptica, el cliente deberá reportarlo dentro de las 48 horas posteriores a la recepción mediante nuestro WhatsApp oficial ({WHATSAPP_DISPLAY}) adjuntando fotos del paquete. Procederemos con la reposición inmediata del producto sin costo adicional o la devolución íntegra del importe pagado.
                  </p>
                </div>

                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-stone-900 mb-1">
                    3. Libro de Reclamaciones Virtual
                  </h5>
                  <p>
                    Conforme al Código de Protección y Defensa del Consumidor (Ley N° 29571) de INDECOPI, ponemos a disposición de todos nuestros usuarios el canal formal de reclamaciones a través de nuestro correo oficial <code className="bg-stone-100 px-1 py-0.5 rounded font-mono">neilq6905@gmail.com</code> o directamente por WhatsApp con registro de código de atención.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] text-stone-500 text-center sm:text-left">
            Última actualización legal: <strong className="text-stone-700">Septiembre 2026</strong> • Vigente en todo el territorio peruano.
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-[#E75A43] text-white text-xs font-bold transition-colors shadow-xs"
          >
            Entendido y Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};
