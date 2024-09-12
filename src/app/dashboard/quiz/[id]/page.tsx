import QuizDetailMain from "@/components/dashboardComponents/QuizDetailMain";

interface QuizDetailProps {
  params: {
    id: string;
  };
}

export default function QuizDetail({ params }: QuizDetailProps) {
  const { id } = params;

  return (
    <QuizDetailMain id={id}/>
  );
}
