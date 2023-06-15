function sync(entity, renderComponent) {
    renderComponent.matrix.copy(entity.worldMatrix);
}

export default sync;