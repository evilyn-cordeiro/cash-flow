import React, { useCallback, useState } from "react";
import { Button as MuiButton, Box, Typography } from "@mui/material";
import { Login as LoginIcon, Mail as MailIcon } from "@mui/icons-material";
import {
  Container,
  Content,
  AnimationContainer,
  ButtonRow,
  TextIntro,
} from "./styles";
import * as Yup from "yup";
import getValidationErrors from "../../utils/getValidationErrors";

interface ForgotPasswordFormData {
  email: string;
}

export const Landing: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (data: ForgotPasswordFormData) => {
    try {
      setLoading(true);

      const schema = Yup.object().shape({
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        return;
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={"../../assets/pngpedro.png"} alt="Pedro Barbeiro Logo" />
          <TextIntro>
            <Typography variant="h4" component="h1" gutterBottom>
              BARBEARIA
            </Typography>
            <Typography variant="body1">
              Agende com facilidade, escolha entre os
              <br />
              melhores profissionais, gerencie
              <br />
              seus horários e desfrute da <br />
              conveniência de cuidar do seu visual
              <br /> com praticidade e eficiência.
            </Typography>
          </TextIntro>

          <ButtonRow>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={2}
            >
              <MuiButton variant="contained" color="primary" href="/signin">
                <LoginIcon style={{ marginRight: 8 }} /> {/* Ícone de login */}
                ENTRAR
              </MuiButton>
              <Typography variant="body1"> | </Typography>
              <MuiButton variant="contained" color="secondary" href="/signup">
                <MailIcon style={{ marginRight: 8 }} /> {/* Ícone de email */}
                CADASTRAR-SE
              </MuiButton>
            </Box>
          </ButtonRow>
        </AnimationContainer>
      </Content>
    </Container>
  );
};
