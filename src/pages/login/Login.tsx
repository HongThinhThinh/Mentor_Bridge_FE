import { Button, Col, Divider, Form, Image, Input, Row } from "antd";
import bg from "../../assets/truong-dai-hoc-fpt-ho-chi-minh.jpg";
import "./Login.scss";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

function Login() {
  return (
    <Row className="login">
      <Col md={9} className="login__form">
        <Row>
          <Col md={24} className="login__form__container">
            <h1>Đăng nhập vào hệ thống</h1>
            <Button className="login__form__container__btnGg">
              <FcGoogle size={17} /> Đăng nhập với Google
            </Button>

            <Divider className="login__form__container__divider">
              Hoặc đăng nhập bằng tên tài khoản
            </Divider>
            <Form
              layout="vertical"
              className="login__form__container__namepass"
            >
              <Form.Item
                label="Tên tài khoản"
                className="login__form__container__namepass__item"
              >
                <Input className="login__form__container__namepass__input" />
              </Form.Item>
              <Form.Item
                label="Mật khẩu"
                className="login__form__container__namepass__item"
              >
                <Input.Password className="login__form__container__namepass__input" />
              </Form.Item>
            </Form>
            <Button className="login__form__container__btnNamepass">
              Đăng nhập
            </Button>
          </Col>
        </Row>
      </Col>
      <Col md={15} className="login__sidebar">
        <Image
          src={bg}
          preview={false}
          height={"100%"}
          className="login__sidebar__bg"
        />
        <div className="login__sidebar__intro">
          <div className="login__sidebar__intro__content">
            <h3 className="text-2xl-medium mb-[16px] ">Giới thiệu</h3>
            <p className="text-xs-book">
              Mentor Bridge là một hệ thống sáng tạo do sinh viên trường đại học
              FPT phát triển, nhằm kết nối và tối ưu hóa trải nghiệm học tập
              giữa sinh viên và mentor. Hệ thống cung cấp các tính năng quản lý
              tài khoản, tạo và quản lý nhóm dự án, cũng như lên lịch gặp gỡ với
              các mentor có kỹ năng phù hợp.
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default Login;
