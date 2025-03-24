import { useGlobalContext } from "../context/Context";

interface RemoveBtnProps {
  code: string;
}

const RemoveBtn = ({ code }: RemoveBtnProps) => {
  const { remove } = useGlobalContext();

  return (
    <button
      onClick={() => remove(code)}
      className="py-1 px-4 bg-[#FD90A3] rounded-2xl text-white hover:bg-[#eb8596]"
    >
      刪除
    </button>
  );
};

export default RemoveBtn;
