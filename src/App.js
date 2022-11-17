import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [postId, setPostId] = useState(1);

  const [post, setPost] = useState(null);

  let changeIndex = 0;

  const getPost = useCallback(() => {
    setIsLoading(true);
    axios
      .get(`https://yts.mx/api/v2/movie_details.json?movie_id=${postId}`)
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          if (postId === 0) {
            alert("없는 페이지입니다.");
            setPostId(1);
            return;
          }
          setPost(response.data);
        } else {
          alert("잘못된 데이터 입니다.");
        }
      })
      .catch((error) => {
        // console.log(error);
        if (error.response.status === 404) {
          alert("페이지가 없습니다.");
          setPostId(1);
        } else {
          alert("문제가 발생하였습니다. 개발자에게 연락주세요.");
        }
      })
      .finally(() => {
        setIsLoading(false);
        console.log("무조건 실행됨");
      });
  }, [postId]);

  useEffect(() => {
    getPost();
  }, [postId]);

  return (
    <div>
      {isLoading || post == null ? (
        <div>로딩 중...</div>
      ) : (
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={post.data.movie.medium_cover_image} />
          <hr></hr>
          <Card.Body>
            <Card.Title>{post.data.movie.title_long}</Card.Title>
            <hr></hr>
            <ListGroup variant="flush">
              <ListGroup.Item>
                ⭐장르 : {post.data.movie.genres[0]},{" "}
                {post.data.movie.genres[1]}{" "}
              </ListGroup.Item>
              <ListGroup.Item>
                ⭐개봉일 : {post.data.movie.year}년
              </ListGroup.Item>
              <ListGroup.Item>
                ⭐상영시간 : {post.data.movie.runtime}분
              </ListGroup.Item>
            </ListGroup>
            <hr></hr>
            <Card.Text>{post.data.movie.description_full}</Card.Text>
            <hr></hr>
            <Button
              variant="link"
              onClick={() => window.open(post.data.movie.url, "_blank")}
            >
              자세히보기
            </Button>
            <div>
              <input type="text" name="postId" placeholder="번호로 찾기"  onChange={(e) => {
                changeIndex = e.target.value;
              }} />
              <Button variant="secondary" onClick={() => setPostId(changeIndex)}>이동</Button>
            </div>
            <hr></hr>
            <Button
              variant="secondary"
              onClick={() => setPostId((prev) => prev + 1)}
            >
              다음
            </Button>
            <Button
              variant="secondary"
              onClick={() => setPostId((prev) => prev - 1)}
            >
              이전
            </Button>
            <hr></hr>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default App;
