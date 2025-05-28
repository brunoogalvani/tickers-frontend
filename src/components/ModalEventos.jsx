import React from 'react';

const ModalEventos = ({ isOpen, onClose, evento }) => {
  if (!isOpen || !evento) return null;  

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeBtn} onClick={onClose}>×</button>

        {/* Container flex para imagem + detalhes */}
        <div style={styles.contentWrapper}>
          {/* Imagem à esquerda */}
          {evento.imagemUrl ? (
            <div style={styles.imageContainer}>
              <img src={evento.imagemUrl} alt={evento.titulo} style={styles.image} />
            </div>
          ) : (
            <div style={styles.imagePlaceholder}>Sem imagem</div>
          )}

          {/* Conteúdo texto à direita */}
          <div style={styles.textContent}>
            <h2>{evento.titulo}</h2>
            {evento.local ? (
              <>
                <p><strong>Nome:</strong> {evento.local.nome}</p>
                <p><strong>Endereço:</strong> {evento.local.endereco}</p>
                <p><strong>Cidade:</strong> {evento.local.cidade}</p>
                <p><strong>Estado:</strong> {evento.local.estado}</p>
                <p><strong>CEP:</strong> {evento.local.cep}</p>
              </>
            ) : (
              <p>Local não informado.</p>
            )}
          </div>
        </div>
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
    width: '600px',
    maxHeight: '80vh',
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
  },
  imageContainer: {
    flexShrink: 0,
    width: '140px',
    height: '140px',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  imagePlaceholder: {
    width: '140px',
    height: '140px',
    borderRadius: '12px',
    backgroundColor: '#374151',
    color: '#9ca3af',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '14px',
    fontStyle: 'italic',
  },
  textContent: {
    flex: 1,
  },
  closeBtn: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    border: 'none',
    background: 'transparent',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#9ca3af', 
    transition: 'color 0.2s ease',
  },
};

export default ModalEventos;
