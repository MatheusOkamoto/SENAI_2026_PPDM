
import { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
  useWindowDimensions
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function Home() {

  const [herois, setHerois] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [montado, setMontado] = useState(false);

  const { width } = useWindowDimensions();

  // Responsividade compatível com SSR
  const desktop = montado && width >= 768;
  const colunas = desktop ? 2 : 1;

  const Container = Platform.OS === 'web'
    ? View
    : SafeAreaView;

  useEffect(() => {
    setMontado(true);
  }, []);

  // Consumo da API
  const carregaHeroes = async () => {
    try {
      setCarregando(true);
      setErro(null);

      const response = await fetch(
        'https://superheroes-api-one.vercel.app/api/herois'
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar heróis');
      }

      const data = await response.json();

      const lista = Array.isArray(data)
        ? data
        : data?.herois || [];

      setHerois(lista);

    } catch (e) {
      setErro(e.message || 'Erro inesperado');

    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregaHeroes();
  }, []);

  // Cabeçalho
  const cabecalho = (
    <View style={styles.cabecalho}>

      <View style={styles.navbar}>

        <View style={styles.marca}>

          <View style={styles.logo}>
            <Text style={styles.logoTexto}>S.</Text>
          </View>

          <View>

            <Text style={styles.marcaTitulo}>
              SUPERHEROES.
            </Text>

            <Text style={styles.marcaSubtitulo}>
              THE HERO ARCHIVE
            </Text>

          </View>

        </View>

        <View style={styles.statusContainer}>

          <View
            style={[
              styles.statusPonto,
              carregando && styles.statusCarregando,
              erro && styles.statusOffline
            ]}
          />

          <Text style={styles.statusTexto}>
            {carregando
              ? 'CONECTANDO'
              : erro
                ? 'OFFLINE'
                : 'ONLINE'}
          </Text>

        </View>

      </View>

      <View style={styles.apresentacao}>

        <View style={styles.etiquetaContainer}>

          <View style={styles.linhaVermelha} />

          <Text style={styles.etiqueta}>
            01 / UNIVERSO DOS HERÓIS
          </Text>

        </View>

        <Text
          style={[
            styles.titulo,
            desktop && styles.tituloDesktop
          ]}
        >
          Conheça as
        </Text>

        <Text
          style={[
            styles.tituloDestaque,
            desktop && styles.tituloDesktop
          ]}
        >
          LENDAS.
        </Text>

        <Text style={styles.descricao}>
          Explore os personagens, seus poderes e suas
          habilidades extraordinárias.
        </Text>

        <View style={styles.estatisticas}>

          <View style={styles.estatistica}>

            <Text style={styles.estatisticaValor}>
              {carregando || erro
                ? '—'
                : String(herois.length).padStart(2, '0')}
            </Text>

            <Text style={styles.estatisticaRotulo}>
              PERSONAGENS
            </Text>

          </View>

          <View style={styles.estatisticaDivisor} />

          <View style={styles.estatistica}>

            <Text style={styles.estatisticaValor}>
              01
            </Text>

            <Text style={styles.estatisticaRotulo}>
              CATÁLOGO
            </Text>

          </View>

        </View>

      </View>

      <View style={styles.secaoCabecalho}>

        <View style={styles.secaoIdentificacao}>

          <Text style={styles.secaoNumero}>
            01.
          </Text>

          <Text style={styles.secaoTitulo}>
            Todos os heróis
          </Text>

        </View>

        <Text style={styles.secaoDescricao}>
          CATÁLOGO
        </Text>

      </View>

    </View>
  );

  // Renderização individual dos heróis
  const renderItem = ({ item, index }) => {

    const numero = String(index + 1).padStart(3, '0');

    const habilidades = Array.isArray(item.habilidade)
      ? item.habilidade.join(', ')
      : item.habilidade;

    return (

      <View
        style={[
          styles.cardWrapper,
          { width: desktop ? '50%' : '100%' }
        ]}
      >

        <View style={styles.card}>

          <View style={styles.imagemContainer}>

            {item.foto ? (

              <Image
                source={{ uri: item.foto }}
                style={styles.imagem}
                resizeMode="contain"
                accessibilityLabel={`Imagem de ${item.nome}`}
              />

            ) : (

              <View style={styles.imagemAusente}>

                <Text style={styles.imagemAusenteIcone}>
                  S.
                </Text>

                <Text style={styles.imagemAusenteTexto}>
                  IMAGEM INDISPONÍVEL
                </Text>

              </View>

            )}

            <View style={styles.numeroCard}>

              <Text style={styles.numeroCardTexto}>
                #{numero}
              </Text>

            </View>

            <View style={styles.categoriaCard}>

              <View style={styles.categoriaPonto} />

              <Text style={styles.categoriaCardTexto}>
                HERO PROFILE
              </Text>

            </View>

          </View>

          <View style={styles.cardLinha} />

          <View style={styles.cardConteudo}>

            <Text style={styles.cardIdentificacao}>
              PERSONAGEM / {numero}
            </Text>

            <Text style={styles.nome}>
              {item.nome || 'Herói desconhecido'}
            </Text>

            <View style={styles.divisor} />

            <View style={styles.forcaContainer}>

              <View>

                <Text style={styles.atributoRotulo}>
                  POWER LEVEL
                </Text>

                <Text style={styles.atributoDescricao}>
                  Nível de força
                </Text>

              </View>

              <Text style={styles.forca}>
                {item.forca ?? '—'}
              </Text>

            </View>

            <View style={styles.habilidadeContainer}>

              <Text style={styles.atributoRotulo}>
                ABILITIES
              </Text>

              <Text style={styles.habilidadeTitulo}>
                Habilidades
              </Text>

              <Text style={styles.habilidadeTexto}>
                {habilidades || 'Não informado.'}
              </Text>

            </View>

            <View style={styles.cardRodape}>

              <Text style={styles.cardRodapeTexto}>
                SUPERHEROES ARCHIVE
              </Text>

              <Text style={styles.cardRodapeNumero}>
                / {numero}
              </Text>

            </View>

          </View>

        </View>

      </View>

    );
  };

  // Rodapé
  const rodape = (

    <View style={styles.rodape}>

      <View style={styles.rodapeMarca}>

        <Text style={styles.rodapeTitulo}>
          SUPERHEROES
        </Text>

        <Text style={styles.rodapePonto}>
          .
        </Text>

      </View>

      <Text style={styles.rodapeDescricao}>
        THE HERO ARCHIVE
      </Text>

      <View style={styles.rodapeDivisor} />

      <Text style={styles.rodapeCopyright}>
        © 2026 Superheroes. Projeto acadêmico SENAI-SP.
      </Text>

    </View>

  );

  // Interface principal
  return (

    <Container style={styles.container}>

      {Platform.OS !== 'web' && (
        <StatusBar style="light" />
      )}

      <FlatList

        key={`lista-${colunas}`}

        style={styles.lista}

        data={
          !carregando && !erro
            ? herois
            : []
        }

        keyExtractor={(item) => String(item.id)}

        renderItem={renderItem}

        numColumns={colunas}

        contentContainerStyle={styles.listaConteudo}

        ListHeaderComponent={cabecalho}

        ListFooterComponent={rodape}

        showsVerticalScrollIndicator={false}

        ListEmptyComponent={

          <View style={styles.mensagemContainer}>

            {carregando && (

              <View style={styles.estadoContainer}>

                <ActivityIndicator
                  size="large"
                  color="#DC2626"
                />

                <Text style={styles.estadoTitulo}>
                  Carregando heróis
                </Text>

                <Text style={styles.estadoDescricao}>
                  Acessando o banco de dados...
                </Text>

              </View>

            )}

            {erro && (

              <View style={styles.estadoContainer}>

                <View style={styles.erroIcone}>

                  <Text style={styles.erroIconeTexto}>
                    !
                  </Text>

                </View>

                <Text style={styles.estadoTitulo}>
                  Falha na conexão
                </Text>

                <Text style={styles.estadoDescricao}>
                  {erro}
                </Text>

                <Pressable
                  accessibilityRole="button"
                  onPress={carregaHeroes}
                  style={({ pressed }) => [
                    styles.botao,
                    pressed && styles.botaoPressionado
                  ]}
                >

                  <Text style={styles.botaoTexto}>
                    TENTAR NOVAMENTE
                  </Text>

                </Pressable>

              </View>

            )}

            {!carregando &&
              !erro &&
              herois.length === 0 && (

              <View style={styles.estadoContainer}>

                <Text style={styles.estadoTitulo}>
                  Nenhum herói encontrado
                </Text>

                <Text style={styles.estadoDescricao}>
                  O catálogo está vazio no momento.
                </Text>

              </View>

            )}

          </View>

        }

      />

    </Container>

  );
}

// ========================================
// ESTILIZAÇÃO
// ========================================

const styles = StyleSheet.create({

  // Estrutura principal

  container: {
    flex: 1,
    backgroundColor: '#0C0C0E',
  },

  lista: {
    flex: 1,
  },

  listaConteudo: {
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingBottom: 32,
    flexGrow: 1,
  },

  // Cabeçalho

  cabecalho: {
    paddingHorizontal: 8,
  },

  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#29292D',
  },

  marca: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  logo: {
    width: 44,
    height: 44,
    backgroundColor: '#DC2626',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoTexto: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '900',
    fontStyle: 'italic',
  },

  marcaTitulo: {
    color: '#F5F5F5',
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  marcaSubtitulo: {
    color: '#A1A1AA',
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 2,
    marginTop: 3,
  },

  // Status da conexão

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: '#161619',
    borderWidth: 1,
    borderColor: '#29292D',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  statusPonto: {
    width: 7,
    height: 7,
    backgroundColor: '#22C55E',
    borderRadius: 4,
  },

  statusCarregando: {
    backgroundColor: '#F59E0B',
  },

  statusOffline: {
    backgroundColor: '#EF4444',
  },

  statusTexto: {
    color: '#D4D4D8',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
  },

  // Apresentação

  apresentacao: {
    paddingTop: 44,
    paddingBottom: 40,
  },

  etiquetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 22,
  },

  linhaVermelha: {
    width: 25,
    height: 2,
    backgroundColor: '#DC2626',
  },

  etiqueta: {
    color: '#F87171',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.8,
  },

  titulo: {
    color: '#F5F5F5',
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: -2,
    lineHeight: 48,
  },

  tituloDestaque: {
    color: '#EF4444',
    fontSize: 52,
    fontWeight: '900',
    letterSpacing: -2.5,
    lineHeight: 58,
  },

  tituloDesktop: {
    fontSize: 80,
    lineHeight: 86,
    letterSpacing: -4,
  },

  descricao: {
    color: '#A1A1AA',
    fontSize: 15,
    lineHeight: 25,
    maxWidth: 480,
    marginTop: 20,
  },

  // Estatísticas

  estatisticas: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 36,
    gap: 24,
  },

  estatistica: {
    gap: 5,
  },

  estatisticaValor: {
    color: '#F5F5F5',
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -1,
    fontVariant: ['tabular-nums'],
  },

  estatisticaRotulo: {
    color: '#A1A1AA',
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1.5,
  },

  estatisticaDivisor: {
    width: 1,
    height: 38,
    backgroundColor: '#333338',
  },

  // Catálogo

  secaoCabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#29292D',
    paddingTop: 24,
    paddingBottom: 22,
    gap: 10,
  },

  secaoIdentificacao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  secaoNumero: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '800',
  },

  secaoTitulo: {
    color: '#F5F5F5',
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: -0.5,
  },

  secaoDescricao: {
    color: '#A1A1AA',
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1.5,
  },

  // Cards

  cardWrapper: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },

  card: {
    flex: 1,
    backgroundColor: '#161619',
    borderWidth: 1,
    borderColor: '#29292D',
    borderRadius: 12,
    overflow: 'hidden',
  },

  // Imagens

  imagemContainer: {
    width: '100%',
    aspectRatio: 4 / 3,
    backgroundColor: '#101012',
    position: 'relative',
    overflow: 'hidden',
  },

  imagem: {
    width: '100%',
    height: '100%',
  },

  imagemAusente: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  imagemAusenteIcone: {
    color: '#3F3F46',
    fontSize: 64,
    fontWeight: '900',
    fontStyle: 'italic',
  },

  imagemAusenteTexto: {
    color: '#A1A1AA',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
  },

  numeroCard: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#0C0C0EDD',
    borderWidth: 1,
    borderColor: '#3F3F46',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  numeroCardTexto: {
    color: '#F5F5F5',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },

  categoriaCard: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#0C0C0EDD',
    borderRadius: 4,
  },

  categoriaPonto: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#DC2626',
  },

  categoriaCardTexto: {
    color: '#F5F5F5',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
  },

  cardLinha: {
    height: 3,
    backgroundColor: '#DC2626',
  },

  // Conteúdo dos cards

  cardConteudo: {
    flex: 1,
    padding: 22,
  },

  cardIdentificacao: {
    color: '#F87171',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.8,
    marginBottom: 8,
  },

  nome: {
    color: '#F5F5F5',
    fontSize: 29,
    fontWeight: '900',
    letterSpacing: -0.8,
  },

  divisor: {
    height: 1,
    backgroundColor: '#29292D',
    marginVertical: 20,
  },

  // Atributos

  forcaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0C0C0E',
    borderWidth: 1,
    borderColor: '#29292D',
    borderLeftWidth: 3,
    borderLeftColor: '#DC2626',
    borderRadius: 6,
    padding: 16,
    gap: 12,
  },

  atributoRotulo: {
    color: '#F87171',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.8,
  },

  atributoDescricao: {
    color: '#A1A1AA',
    fontSize: 12,
    marginTop: 6,
  },

  forca: {
    color: '#F5F5F5',
    fontSize: 28,
    fontWeight: '900',
    fontVariant: ['tabular-nums'],
    flexShrink: 1,
    textAlign: 'right',
  },

  habilidadeContainer: {
    marginTop: 24,
    marginBottom: 24,
  },

  habilidadeTitulo: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 8,
  },

  habilidadeTexto: {
    color: '#A1A1AA',
    fontSize: 14,
    lineHeight: 22,
  },

  // Rodapé dos cards

  cardRodape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#29292D',
    paddingTop: 16,
    marginTop: 'auto',
  },

  cardRodapeTexto: {
    color: '#A1A1AA',
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1,
  },

  cardRodapeNumero: {
    color: '#F87171',
    fontSize: 11,
    fontWeight: '700',
  },

  // Estados da aplicação

  mensagemContainer: {
    paddingHorizontal: 8,
    paddingBottom: 24,
  },

  estadoContainer: {
    backgroundColor: '#161619',
    borderWidth: 1,
    borderColor: '#29292D',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
    gap: 14,
  },

  estadoTitulo: {
    color: '#F5F5F5',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },

  estadoDescricao: {
    color: '#A1A1AA',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },

  erroIcone: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DC262620',
    borderWidth: 1,
    borderColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
  },

  erroIconeTexto: {
    color: '#F87171',
    fontSize: 24,
    fontWeight: '800',
  },

  botao: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 24,
    paddingVertical: 15,
    borderRadius: 6,
    marginTop: 12,
  },

  botaoPressionado: {
    backgroundColor: '#B91C1C',
    opacity: 0.85,
  },

  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },

  // Rodapé principal

  rodape: {
    marginHorizontal: 8,
    marginTop: 24,
    paddingTop: 32,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: '#29292D',
    alignItems: 'center',
  },

  rodapeMarca: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rodapeTitulo: {
    color: '#F5F5F5',
    fontSize: 23,
    fontWeight: '900',
    letterSpacing: 1,
  },

  rodapePonto: {
    color: '#DC2626',
    fontSize: 23,
    fontWeight: '900',
  },

  rodapeDescricao: {
    color: '#A1A1AA',
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 3,
    marginTop: 5,
  },

  rodapeDivisor: {
    width: 32,
    height: 2,
    backgroundColor: '#DC2626',
    marginVertical: 24,
  },

  rodapeCopyright: {
    color: '#A1A1AA',
    fontSize: 11,
    lineHeight: 18,
    textAlign: 'center',
  },

});
