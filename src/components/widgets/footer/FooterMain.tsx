import React from "react";
import Footer from "../../common/footer/Footer";
import Container from "../../common/container/Container";
import { Rocket } from "lucide-react";
import Link from "next/link";
const FooterMain = () => {
  return (
    <Footer className="w-full py-[4rem] border-t">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-[1rem]">
          <div className="col-span-1 md:col-span-2 ">
            <div className="flex items-center gap-[1rem] mb-3">
              <div className="logo">
                <Rocket className="text-primary" size={35} />
              </div>
              <h1 className="text-[1.25rem] font-bold bg-gradient-hero bg-clip-text text-transparent">
                IdeaCrafter
              </h1>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Мы помогаем молодым предпринимателям находить, сотрудничать и
              создавать новое поколение инновационных стартапов. Присоединяйтесь
              к нашему сообществу и воплощайте свои идеи в реальность.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Платформа
            </h4>
            <ul className="space-y-6">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  О нас
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Как это работает
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Успешные истории
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Комьюнити
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Поддержка
            </h4>
            <ul className="space-y-6">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Свяжитесь с нами
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Справочный центр
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Условия предоставления услуг
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Политика конфиденциальности
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t">
          <p>© 2024 IdeaCrafter. All rights reserved.</p>
        </div>
      </Container>
    </Footer>
  );
};

export default FooterMain;
