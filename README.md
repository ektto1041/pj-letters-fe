# PJ Letters · 2024.11

**PJ Letters**는 주변인들과 롤링페이퍼를 작성하고 공유하는 서비스로, 현대 오토에머 모빌리티 SW 스쿨 교육생들을 대상으로 운영했던 서비스입니다.

[시연 영상](https://drive.google.com/file/d/1-3WTB-qVCFLre4KI9p-XbiW2rO_HgipG/view?usp=sharing)

(※ 현재는 배포되지 않은 프로젝트입니다.)

## 😀 개발 인원

| 이름 | 역할 | 연락처 |
| --- | --- | --- |
| 박상연 | FE | [dhkdwk1041@gmail.com](mailto:dhkdwk1041@gmail.com) |
| 이윤주 | BE | [glowju013](https://github.com/glowju013) |

## 🛠 프로젝트 기술 스택

- **프론트엔드**: React.js, css module, typescript, axios, zustand, TipTap Editor
- **백엔드**: Spring Boot, Spring Data JPA, MySQL
- **배포**: AWS (EC2, S3, Route 53), Docker, github action

## ✏️ Issue

### 모바일 환경에서의 이미지 저장

PJ Letters 프로젝트에서는 사용자가 작성한 편지를 이미지로 저장할 수 있는 기능을 제공했습니다. 이를 위해 html-to-image 라이브러리를 활용해 DOM 요소를 PNG 이미지로 변환했습니다.

하지만 Safari 브라우저, 특히 iOS 환경에서는 이미지가 정상적으로 저장되지 않는 문제가 있었습니다. 이를 해결하기 위해 Safari 브라우저에서는 다운로드 대신 이미지를 새 탭에서 열도록 구현하여 사용자 경험을 보완했습니다.
