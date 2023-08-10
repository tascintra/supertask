'use client'
import { Button } from '@/components/Atoms'

interface ModalProps {
  showModal: boolean
}

export const Modal = ({ showModal }: ModalProps) => {
  return (
    <>
      {showModal && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative mx-auto my-6 w-auto max-w-sm p-4">
              {/*content*/}
              <div className="relative flex w-full flex-col items-center rounded-3xl border-0 bg-white shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex w-full justify-center rounded-t border-b border-solid border-slate-200 p-5">
                  <h3 className="text-center text-xl font-semibold">
                    Task Details
                  </h3>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-6">
                  <p className="my-4 text-center text-lg leading-relaxed text-slate-500">
                    Seus dados foram enviados com sucesso.
                  </p>
                </div>
                {/*footer*/}
                <div className="flex w-full items-center justify-center rounded-b border-t border-solid border-slate-200 p-6">
                  <Button color="success" className="max-w-[232px]">
                    Confirm
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25" />
        </>
      )}
    </>
  )
}
