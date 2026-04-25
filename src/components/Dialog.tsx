import { useState } from "react";
import { Plus, X } from "lucide-react";

type DialogProps = {
  showDialog: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  guests: string[];
  setGuests: React.Dispatch<React.SetStateAction<string[]>>;
};

export function Dialog({
  showDialog,
  setShowDialog,
  guests,
  setGuests,
}: DialogProps) {
  const [newGuest, setNewGuest] = useState<string>("");

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-160 rounded-lg p-6 shadow-black/50 bg-zinc-600 flex flex-col gap-3">
        <div>
          {guests.length > 0 ? (
            <div className="flex flex-row justify-between w-full">
              <h3 className="font-lg font-semibold">Selecione convidados</h3>
              <button
                className="p-2 bg-lime-300 text-white font-bold shadow-lgshadow-black/80 rounded-lg"
                onClick={() => setShowDialog(!showDialog)}>
                Pronto
              </button>
            </div>
          ) : (
            <div className="flex flex-row justify-between w-full">
              <h3 className="font-lg font-semibold">Selecione convidados</h3>
              <X onClick={() => setShowDialog(!showDialog)} />
            </div>
          )}
        </div>
        <p>
          Os convidados irao receber e-mails para confirmar a participação na
          viagem
        </p>
        <div className="flex flex-wrap gap-2">
          {guests.map((guest) => (
            <div
              key={guest}
              className="rounded-lg shadow-black/80 bg-zinc-900 flex flex-row p-4 gap-3 w-fit">
              <span>{guest}</span>
              <button className="bg-lime-300 text-lime-950 shadow-lgshadow-black/80 rounded-lg ">
                <X
                  onClick={() => setGuests(guests.filter((g) => g != guest))}
                />
              </button>
            </div>
          ))}
        </div>
        <hr />
        <input
          className="w-full border rounded p-4"
          type="text"
          placeholder="Digite o email do convidado"
          value={newGuest}
          onChange={(e) => setNewGuest(e.target.value)}
        />
        <button
          className=" flex flex-row gap-2 bg-lime-300 text-lime-950 rounded-lg p-5 font-medium justify-center "
          onClick={() => {
            if (newGuest.trim() !== "") {
              setGuests([...guests, newGuest]);
              setNewGuest("");
            }
          }}>
          <Plus />
          Adicionar convidado
        </button>
      </div>
    </div>
  );
}
