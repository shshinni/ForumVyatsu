import QuestionsItem from "./QuestionsItem";
export default function Questions() {
  const questions = [
    { id: 1, ques: "куда идти?", answer: "в монастырь" },
    { id: 2, ques: "что делать?", answer: "молиться" },
    { id: 3, ques: "а еще что делать?", answer: "пить пиво" },
  ];

  return (
    <div className="mt-22">
      <h2 className="text-center font-medium mb-8">Часто задаваемые вопросы</h2>
      <div className="max-w-2xl mx-auto space-y-3">
        {questions.map((item) => (
          <QuestionsItem
            key={item.id}
            questions={item.ques}
            answer={item.answer}
          />
        ))}
      </div>
    </div>
  );
}
