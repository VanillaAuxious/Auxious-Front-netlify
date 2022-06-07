import useBottomSheet from '../hooks/useBottomSheet';

import './BottomSheet.css';

function BottomSheet() {
  const { sheetArea, contentArea } = useBottomSheet();

  return (
    <div className='bottomsheet' ref={sheetArea}>
      <div className='bottomsheet-header'>
        <div className='handle'></div>
      </div>
      <div className='bottomsheet-content' ref={contentArea}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor omnis,
        soluta sit voluptatibus totam culpa officiis cupiditate, molestias et,
        nulla quidem molestiae numquam porro minima delectus laboriosam esse
        expedita quia recusandae similique! Reprehenderit error, doloribus
        voluptates excepturi assumenda et itaque, autem alias dolores molestiae
        fuga dignissimos repudiandae necessitatibus incidunt. Qui accusantium
        vel est voluptatibus. Error facilis tempora fugiat ad, velit animi
        quidem cupiditate officiis quisquam eius sapiente commodi corrupti
        reprehenderit unde maiores eum, perferendis ut ex rerum, voluptas sed
        minus assumenda dolorum quibusdam! Perspiciatis mollitia tempora dolore
        ducimus minus sequi sit earum possimus. Dicta magni possimus
        perspiciatis suscipit quis cumque culpa ex atque repellat facere,
        exercitationem amet voluptates numquam incidunt tenetur, ipsum sequi
        nam. Iure, praesentium, consequatur omnis molestias cumque nam at
        dolorum repellendus doloribus sint nihil qui sit inventore dolor
        veritatis quia aspernatur distinctio delectus, expedita asperiores
        debitis similique tempore id necessitatibus? Laboriosam minima rerum,
        tempore odio excepturi officiis sit nisi deserunt? Suscipit reiciendis,
        tempora rerum officiis quidem, corrupti quaerat quia officia laudantium
        voluptas dicta nesciunt possimus facere magnam odit, dolorem repellat?
        Ea totam repudiandae expedita aliquid fugiat dolore voluptas
        repellendus. Ipsam tenetur impedit sit a rerum, quibusdam exercitationem
        ipsum corrupti adipisci fugiat natus ratione debitis praesentium dolor
        facilis dolore nobis qui commodi! Aspernatur, eum, at quo praesentium
        deleniti labore, facere iusto facilis eius sunt ducimus blanditiis
        inventore! Dolorem necessitatibus perspiciatis, obcaecati odio vel
        mollitia assumenda ullam debitis ea veniam autem exercitationem iste,
        molestiae hic illo aperiam natus illum voluptatibus aspernatur nihil
        officiis et doloribus suscipit quas. Tenetur vero odit aperiam,
        accusamus aspernatur alias magni. Doloremque tempora, a deleniti omnis
        earum ad mollitia esse ratione cumque numquam vitae explicabo voluptates
        saepe assumenda, ipsam placeat doloribus dolorum sit dolorem? Delectus
        laboriosam tempore dolor nisi modi omnis id cupiditate corrupti earum
        veritatis explicabo aliquam distinctio, doloribus quasi cum
        perspiciatis? Dolor eum vero non dolorem nobis soluta veritatis eveniet
        ipsam! Quis voluptates voluptatum omnis dolores iure optio? Veniam vitae
        numquam unde. Voluptatibus ipsam eum soluta quisquam dicta quo
        cupiditate totam eveniet harum voluptate, commodi voluptates obcaecati
        recusandae consequuntur praesentium corrupti officiis excepturi vitae
        sapiente quibusdam fugit maxime iste? Error, illo recusandae. Labore,
        veritatis officiis perspiciatis earum dolores, necessitatibus sapiente
        veniam accusantium perferendis et temporibus maiores quo vel aspernatur
        alias quam iste officia rem commodi blanditiis nam rerum dolor quibusdam
        sit? Recusandae, delectus ut perferendis provident consectetur impedit a
        voluptatum quas. Necessitatibus magni minima reprehenderit. Quae
        reiciendis animi minus, molestiae fuga facere soluta culpa, corrupti
        consectetur reprehenderit doloremque ullam excepturi vel, amet rem
        sapiente magnam dicta exercitationem provident deserunt iure facilis?
        Nobis, ut dolore modi eveniet praesentium nisi eos consequuntur velit
        nam possimus aperiam facere laborum voluptates facilis officiis, nihil
        ipsum fuga beatae nemo sint cum delectus. Tenetur eum blanditiis
        expedita voluptatum consectetur dignissimos officiis esse est numquam
        saepe placeat fugiat, molestiae, soluta aliquid debitis reiciendis quod
        qui dolor quae, nobis cum accusamus quam eligendi sapiente. Id fuga
        veritatis alias recusandae voluptates. Repellat nostrum tenetur numquam
        alias ducimus aut cupiditate esse fuga velit dolorem natus perspiciatis
        iste praesentium, voluptatem voluptatum ipsa? Quas, adipisci.
      </div>
    </div>
  );
}

export default BottomSheet;
