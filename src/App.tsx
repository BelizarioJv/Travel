import {
  PlaneTakeoff,
  ArrowRight,
  Calendar,
  MapPin,
  User,
  Settings2,
} from "lucide-react";
import { useState } from "react";

function App() {
  const [showInviteEmail, setShowInviteEmail] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <main className="h-screen flex flex-col items-center justify-center gap-6 ">
        <div
          className="flex flex-col items-center bg-zinc-600 rounded-lg 
              shadow-lg shadow-black/80 border border-white/5 p-10">
          {/* Texto e logo */}
          <div className="flex min-w-xl items-center justify-center">
            <PlaneTakeoff size={52} color="#b6e372" />
            <p className="ml-5 text-5xl">Travel.com</p>
          </div>
          <p className="text-zinc-300 text-lg mt-10">
            Convide seus amigos para planejar a proxima viagem
          </p>

          {/* Inputs */}
          <div className="flex flex-col items-center gap-5 mt-5 bg-zinc-300 rounded-lg p-5 shadow-lg shadow-black/80">
            <div className="flex flex-row intem-center gap-5">
              <div className=" bg-zinc-500 rounded-lg p-5 shadow-lg shadow-black/80">
                <MapPin />
                <input
                  className="p-2 mt-2 outline-0"
                  type="text"
                  placeholder="Para onde voce deseja ir ? "
                />
              </div>

              <div className="Flex flex-row  items-center w-fit bg-zinc-500 rounded-lg p-5 shadow-lg shadow-black/80">
                <Calendar />
                <input
                  className="p-2 mt-2 outline-0"
                  type="text"
                  placeholder="Quando voce deseja ir?"
                />
              </div>
              {showInviteEmail ? (
                <button
                  onClick={() => setShowInviteEmail(!showInviteEmail)}
                  className="bg-zinc-500 text-amber-100rounded-lg p-5 font-medium flex items-center ">
                  Alterar local/data <Settings2 />
                </button>
              ) : (
                <button
                  onClick={() => setShowInviteEmail(!showInviteEmail)}
                  className="bg-lime-300 text-lime-950 rounded-lg p-5 font-medium flex items-center ">
                  Continuar <ArrowRight />
                </button>
              )}
            </div>

            {/* Rederizaçao condicional */}
            {showInviteEmail && (
              <div className="flex flex-row justify-between gap-5">
                <div className=" bg-zinc-500 rounded-lg p-5 shadow-lg shadow-black/80">
                  <User />
                  <input
                    className="p-2 mt-2 outline-0"
                    type="text"
                    placeholder="Quem estara na viagem ? "
                  />
                </div>
                <button
                  onClick={() => setShowDialog(!showDialog)}
                  className="bg-lime-300 text-lime-950 rounded-lg p-5 font-medium flex items-center ">
                  Confirmar viagem <ArrowRight />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Dialog */}
        {showDialog && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div
              className="w-160 rounded-lg p-6 shadow-black/50 bg-zinc-900 flex flex-col gap-3"
              onClick={() => setShowDialog(false)}>
              <h4>Selecione convidados</h4>
              <p>
                Os convidados irao receber e-mails para confirmar a participação
                na viagem
              </p>
              <div>{}</div>
              <hr />
              <input
                className="w-full border rounded grow-0"
                type="text"
                placeholder="Digite o email do convidado"
              />
            </div>
          </div>
        )}

        {/*Texto  */}
        <div className="flex items-center justify-center">
          <p>
            Ao planejar sua viagem pelça Travel.com voce automaticamente
            concorda com nossos{" "}
            <a className="underline" href="#">
              termos de uso
            </a>{" "}
            e
            <a className="underline" href="#">
              {"  "}
              politicas de privacidade.
            </a>
          </p>
        </div>
      </main>
    </>
  );
}

export default App;
