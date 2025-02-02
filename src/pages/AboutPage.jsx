const About = () => {
  useEffect(() => {
    setLoading(true); // 로딩 시작
    axios.get('/api/about').finally(() => {
      setLoading(false); // 데이터 로딩 완료 후 스피너 숨김
    });
  }, []);
  return (
    <div className="flex justify-center items-center h-screen bg-green-50">
      <h1 className="text-4xl font-bold text-green-600">About Us</h1>
    </div>
  );
};

export default About;
