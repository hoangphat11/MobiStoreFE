import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import {
  WrapperFooter,
  FooterColumn,
  FooterTitle,
  FooterText,
  FooterMap,
  FooterIconRow,
  FooterSocials,
} from "./style";

const Footer = () => {
  return (
    <WrapperFooter>
      <FooterColumn>
        <FooterTitle>THÔNG TIN LIÊN HỆ</FooterTitle>
        <hr />
        <div style={{ marginTop: "20px" }}>
          <FooterIconRow>
            <Phone size={16} /> 0123 567 899
          </FooterIconRow>
          <FooterIconRow>
            <Mail size={16} /> iuh@gmail.com
          </FooterIconRow>
          <FooterIconRow>
            <Clock size={16} /> Thứ 2 - Chủ nhật: 7h30 - 17h30
          </FooterIconRow>
        </div>
      </FooterColumn>

      <FooterColumn>
        <FooterTitle>CHI NHÁNH</FooterTitle>
        <hr />
        <FooterText>Địa chỉ:12 Nguyễn Văn Bảo, Phường 1, Gò Vấp, Hồ Chí Minh</FooterText>
        <FooterMap>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.698780858629!2d106.6842705!3d10.8221589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174deb3ef536f31%3A0x8b7bb8b7c956157b!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBUUC5IQ00!5e0!3m2!1sen!2s!4v1712836882746!5m2!1sen!2s"
            width="100%"
            height="150"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Map"
          ></iframe>
        </FooterMap>
      </FooterColumn>

      <FooterColumn>
        <FooterTitle>VỀ CHÚNG TÔI</FooterTitle>
        <hr />
        <FooterText>
          <span>
            {" "}
            Mobile Store là địa chỉ tin cậy chuyên cung cấp điện thoại chính
            hãng, giá tốt cùng nhiều ưu đãi hấp dẫn. Chúng tôi cam kết: Sản phẩm
            chất lượng, nguồn gốc rõ ràng Giá cả cạnh tranh, hỗ trợ trả góp Dịch
            vụ hậu mãi chuyên nghiệp Mua online tiện lợi, giao hàng nhanh chóng
          </span>
        </FooterText>
      </FooterColumn>

      <FooterColumn>
        <FooterTitle>CHÍNH SÁCH QUY ĐỊNH</FooterTitle>
        <hr />
        <FooterText>Chính sách bảo hành</FooterText>
        <FooterText>Chính sách bảo mật thông tin</FooterText>
        <FooterTitle>THEO DÕI MOBILE STORE QUA</FooterTitle>
        <FooterSocials>
          <a
            href="https://www.facebook.com/groups/1478826775732084"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGoogle />
          </a>
        </FooterSocials>
      </FooterColumn>
    </WrapperFooter>
  );
};

export default Footer;
