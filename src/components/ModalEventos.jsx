import React from 'react';

const ModalEventos = ({ isOpen, onClose, evento }) => {
  if (!isOpen || !evento) return null;  // evita tentar renderizar sem dados

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeBtn} onClick={onClose}>X</button>
        <h2>{evento.titulo}</h2>
        {evento.local ? (
          <div>
            <p><strong>Nome:</strong> {evento.local.nome}</p>
            <p><strong>Endereço:</strong> {evento.local.endereco}</p>
            <p><strong>Cidade:</strong> {evento.local.cidade}</p>
            <p><strong>Estado:</strong> {evento.local.estado}</p>
            <p><strong>CEP:</strong> {evento.local.cep}</p>
          </div>
        ) : (
          <p>Local não informado.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#000000', padding: '20px', borderRadius: '8px',
    width: '400px', maxHeight: '80vh', overflowY: 'auto',
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute', top: '10px', right: '10px',
    border: 'none', background: 'transparent', fontSize: '16px', cursor: 'pointer',
  }
};

export default ModalEventos;
