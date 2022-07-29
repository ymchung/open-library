import React from 'react';

const namespace = 'loading';

const Spinner = () => (
    <div className={namespace}>
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
        </div>
    </div>
);

export default Spinner;