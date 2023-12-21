import React from 'react'

interface ShadowProps {
    modalActive: boolean,
    setModalActive: (modalActive: boolean) => void
}

function Shadow({ modalActive, setModalActive }: ShadowProps) {
    function handleCloseShadow() {
        setModalActive(false);
    }

  return (
    <div className={modalActive ? "shadow shadow-show" : "shadow"} onClick={handleCloseShadow}></div>
  )
}

export default Shadow