function abrirModal(id) {
    document.getElementById(id).classList.remove('hidden');
}

function fecharModal(id) {
    document.getElementById(id).classList.add('hidden');
}

// Exemplo de uso:
// abrirModal('modalAddProfissional');
// abrirModal('modalEditProfissional');
abrirModal('modalDeleteProfissional');