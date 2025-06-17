import React from 'react';

const ModalEventos = ({ isOpen, onClose, evento }) => {
  if (!isOpen || !evento) return null;  

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeBtn} onClick={onClose}>×</button>

      
        <div style={styles.contentWrapper}>
         
          {evento.imagemCapa ? (
            <img src={evento.imagemCapa} className="rounded-lg w-[380px]" />
          ) : (
            <div style={styles.imagePlaceholder}>Sem imagem</div>
          )}

          {/* Conteúdo texto à direita */}
          < div className='flex flex-col gap-[30px]'>
            <div className='flex flex-col gap-[5px]'>
              <h2 className='font-bold text-[28px]'>{evento.titulo}</h2>
              <p>{evento.dataFim ? (
                  `${evento.horaInicio} ${evento.dataInicio} - ${evento.dataFim}`
                ) : (
                  `${evento.horaInicio} ${evento.dataInicio}`
                )}
              </p>
              <p className='text-base'>{evento.descricao}</p>
              <p>{evento.preco==0 ? (
                "Ingresso Gratuito" 
              ) : (
                Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL'}).format(evento.preco)
              )}</p>
            </div>
            <div className='flex flex-col'>
                {evento.local ? (
                  <>
                    <p><strong>Local:</strong> {evento.local.nome}</p>
                    <p><strong>Endereço:</strong> {evento.local.endereco}, {evento.local.cidade} - {evento.local.estado}, {evento.local.cep}</p>
                  </>
                ) : (
                  <p>Local não informado.</p>
                )}
            </div>
          </div>
        </div>
        <button className='bg-white/20 px-4 py-2 float-end mt-5 rounded-xl hover:bg-white/15 transition'>Comprar</button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(5px)', 
  },
  modal: {
    backgroundColor: '#1f2937', 
    padding: '30px 25px',
    borderRadius: '12px',
    width: '1200px',
    overflowY: 'auto',
    fontSize: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)', 
    position: 'relative',
    color: '#f9fafb',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    transition: 'transform 0.3s ease, opacity 0.3s ease',
    transform: 'translateY(0)',
    opacity: 1,
  },
  contentWrapper: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center'
  },
  imagePlaceholder: {
    width: '400px',
    height: '240px',
    borderRadius: '12px',
    backgroundColor: '#374151',
    color: '#9ca3af',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '14px',
    fontStyle: 'italic',
  },
  closeBtn: {
    position: 'absolute',
    top: '12px',
    right: '20px',
    border: 'none',
    background: 'transparent',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#9ca3af', 
    transition: 'color 0.2s ease',
  },
};

export default ModalEventos;
