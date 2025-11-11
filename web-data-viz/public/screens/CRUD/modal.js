function abrirModal(modal, idUsuario) {
    document.getElementById(modal).classList.remove('hidden');
}

function fecharModal(modal) {
    document.getElementById(modal).classList.add('hidden');
}

// Exemplo de uso:
// abrirModal('modalEditProfissional');
// abrirModal('modalDeleteProfissional');