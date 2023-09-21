import {ImageGalleryItem} from 'components/ImageGalleryItem/ImageGalleryItem'
import { List } from './ImageGalery.styled';
import PropTypes from 'prop-types';

export function ImageGallery({ images }) {
  

  return (
        <List>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              img={webformatURL}
              secondImg={largeImageURL}
              tag={tags}
            />
          ))}
        </List>
  );
}


// export class OldImageGallery extends Component {
//   state = {
//     images: null,
//     total: 0,
//     page: 1,
//     totalItems: 0,
//     visibleBtn: false,
//     loader: false,
//   };

//   componentDidUpdate = (prevProps, prevState) => {
//     const { request } = this.props;
//     const { page, total, totalItems } = this.state;
//     if (prevProps.request !== request) {
//       this.setState({
//         loader: true,
//       });
//       requestToTheServer(request, 1).then(({ hits, totalHits }) => {
//         if (totalHits === 0) {
//           alert('Sorry, no content found!');
//           this.setState(prev => ({
//             images: [...hits],
//             loader: false,
//             visibleBtn: false,
//           }));
//           return 
//         }

//         this.setState(prev => ({
//           images: [...hits],
//           total: hits.length,
//           totalItems: totalHits,
//           page: 1,
//           loader: false,
//         }));
//       });
//       return;
//     }

//     if (prevState.page !== page && page !== 1) {
//       this.setState({
//         visibleBtn: false,
//         loader: true,
//       });
//       requestToTheServer(request, page).then(({ hits, totalHits }) => {
//         this.setState(prev => ({
//           images: [...prev.images, ...hits],
//           total: prev.total + hits.length,
//         }));
//       });
//     }

//     if (prevState.total !== total) {
//       if (totalItems <= total) {
//         this.setState({
//           visibleBtn: false,
//           loader: false,
//         });
//         alert('Last page loaded.');
//       } else {
//         this.setState({
//           visibleBtn: true,
//           loader: false,
//         });
//       }
//     }
//   };

//   togglVisible = () => {
//     this.setState(prev => ({
//       visibleBtn: !prev.visible,
//       loader: !prev.loader,
//     }));
//   };

//   loadNewImages = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   render() {
//     const { visibleBtn, images, loader } = this.state;
//     return (
//       <Container>
//         {images && (
//           <List>
//             {images.map(({ id, webformatURL, largeImageURL, tags }) => (
//               <ImageGalleryItem
//                 key={id}
//                 img={webformatURL}
//                 secondImg={largeImageURL}
//                 tag={ tags}
//               />
//             ))}
//           </List>
//         )}
//         {visibleBtn && <Button onClick={this.loadNewImages} />}
//         {loader && 
//           <Loader/>
//         }
//       </Container>
//     );
//   }
// };



ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
}