
import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
////////////////////////
import { Path, PDFViewer } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet, Font, Image, Svg } from '@react-pdf/renderer';
import logo from '../../images/blackLogo.png'


const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: 'Helvetica', padding: "50", position: "relative" },
  header: { marginBottom: 20, display: "flex", flexDirection: "row", justifyContent: "space-between", },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
  },
  tableRow: { flexDirection: "row" },
  tableColHeader: { width: "20%", borderBottom: "2pt solid #000", padding: 5, fontSize: "12px", margin: "-1px", backgroundColor: "#f1c92f", fontWeight: "600" },
  tableColHeaderName: { width: "40%", borderBottom: "2pt solid #000", padding: 5, fontSize: "12px", margin: "-1px", backgroundColor: "#f1c92f", fontWeight: "600" },

  tableCol: { width: "20%", borderBottom: "2pt solid #000", padding: 5, fontSize: "12px", margin: "-1px" },
  tableColName: { width: "40%", borderBottom: "2pt solid #000", padding: 5, fontSize: "12px", margin: "-1px" },
  totalCol: { width: "20%", padding: 5, fontSize: "12px", margin: "-1px", fontWeight: "600", marginTop: '5px', },
  totalColName: { width: "40%", padding: 5, fontSize: "12px", margin: "-1px", fontWeight: "600", marginTop: '5px', },
  colorCol: { width: "20%", padding: 5, fontSize: "12px", margin: "-1px", fontWeight: "600", marginTop: '5px', backgroundColor: "#f1c92f" },
  title: { fontSize: "24px", fontWeight: "800", color: "#f1c92f" },
  text: { fontSize: "12px" },
  image: {
    width: 100,
    height: 100,
    // marginBottom: 10
  },
  logo: {
    height: '100%',
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  user: {
    display: "flex",
    alignItems: "flex-start",
    marginTop: "12px"
  },
  footer: {
    display: "flex",
    gap:"30px",
    //  flexDirection: "row",
    position: 'absolute',
    bottom: "30",
    left: 0,
    right: 0,
    // textAlign: 'center',
    alignItems:"flex-start",
    color: "black",
    borderTop: "2px soled #f1c92f",
    paddingTop: "10px",
    width:"96%",
    marginLeft:"2%",
    marginRight:"2%"
  },
  footer1: {
    width:"100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    width:'25%',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
    justifyContent: "center "
  },
  div: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    gap: "5px"
  },
rs:{
  borderTop: "2px soled #f1c92f",
  width:"100%",
  paddingTop:"10px",
  fontWeight:"700"
}
});
///////////////////////
const InvoicePDF = (props) => (
  <Document title="Sunflower-World"
    FileName="pdf">
    <Page size="A4" title={props?.user?.name} style={styles.page}>
      <View style={styles.header}>
        <View style={styles.logo}>
          <Image
            style={styles.image}
            src={logo}
          />
          <Text >
            Sunflower World
          </Text>
        </View>
        <View style={styles.user}>
          <Text style={styles.title}>INVOISE</Text>
          <Text style={styles.text}>Date:  {props?.date}</Text>
          <Text style={styles.text}>{" "}</Text>

          <Text style={styles.text}>To :</Text>
          <Text style={styles.text}>{props?.user?.name}</Text>
          <Text style={styles.text}>phone: {props?.user?.phone}</Text>
          <Text style={styles.text}>city: {props?.user?.city}</Text>
          <Text style={styles.text}>adress: {props?.user?.adress}</Text>

        </View>
      </View>
      {/* ///// */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeaderName}><Text>Items</Text></View>
          <View style={styles.tableColHeader}><Text>Price</Text></View>
          <View style={styles.tableColHeader}><Text>Quantity</Text></View>
          <View style={styles.tableColHeader}><Text>Total</Text></View>
        </View>

        {props?.order?.products?.moneyProducts?.map((item, i) => (
          <View style={styles.tableRow} key={i}>
            <View style={styles.tableColName}><Text>{item.product?.name}</Text></View>
            <View style={styles.tableCol}><Text>{item.price} </Text></View>
            <View style={styles.tableCol}><Text>{item.quantity}</Text></View>
            <View style={styles.tableCol}><Text>{item.price * item.quantity} </Text></View>
          </View>
        ))}
        {props?.order?.products?.pointProducts?.map((item, i) => (
          <View style={styles.tableRow} key={i}>
            <View style={styles.tableColName}><Text>{item.product?.name}</Text></View>
            <View style={styles.tableCol}><Text>{ } </Text></View>
            <View style={styles.tableCol}><Text>{item.quantity}</Text></View>
            <View style={styles.tableCol}><Text>"point" </Text></View>
          </View>
        ))}
        {props?.order?.offers?.map((item, i) => (
          <View style={styles.tableRow} key={i}>
            <View style={styles.tableColName}><Text>{item?.name}</Text></View>
            <View style={styles.tableCol}><Text>{item.priceA} </Text></View>
            <View style={styles.tableCol}><Text>{item.quantity}</Text></View>
            <View style={styles.tableCol}><Text>{item.priceA * item.quantity} </Text></View>
          </View>
        ))}
        {props?.order?.perfumes?.map((item, i) => (
          <View style={styles.tableRow} key={i}>
            <View style={styles.tableColName}>
              {item?.perfumeOrderVariants?.map((itemin, indexin) => (
                <Text>bottle {itemin?.size} </Text>
              ))}
            </View>
            <View style={styles.tableCol}><Text> </Text></View>
            <View style={styles.tableCol}>
              {item?.perfumeOrderVariants?.map((itemin, indexin) => (
                <Text>{itemin?.count} </Text>
              ))}</View>
            <View style={styles.tableCol}><Text>{item?.totalPrice} </Text></View>
          </View>
        ))}



        <View style={styles.tableRow}>
          <View style={styles.totalColName}><Text>{ }</Text></View>
          <View style={styles.totalCol}><Text>{ }</Text></View>
          <View style={styles.colorCol}><Text>SUBTOTAL </Text></View>
          <View style={styles.colorCol}><Text>{props?.total}.SAR </Text></View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.totalColName}><Text>{ }</Text></View>
          <View style={styles.totalCol}><Text>{ }</Text></View>
          <View style={styles.colorCol} ><Text>DISCOUNT  </Text></View>
          <View style={styles.colorCol}><Text>{props?.discount}.SAR </Text></View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.totalColName}><Text>{ }</Text></View>
          <View style={styles.totalCol}><Text>{ }</Text></View>
          <View style={styles.colorCol} ><Text>TOTAL  </Text></View>
          <View style={styles.colorCol}><Text>{props?.total - props?.discount}.SAR</Text></View>
        </View>
      </View>
      {/* ///// */}
      <View style={styles.footer}>
      <View style={styles.footer1}>
        <View style={styles.icon}>
          <View style={styles.div}> <Text>Bank transfer</Text>
            <Svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 512 512" >
              <Path fill="currentColor" d="M247.759 14.358L16 125.946V184h480v-58.362ZM464 152H48v-5.946l200.241-96.412L464 146.362ZM48 408h416v32H48zm-32 56h480v32H16zm40-248h32v160H56zm368 0h32v160h-32zm-96 0h32v160h-32zm-176 0h32v160h-32zm88 0h32v160h-32z"></Path></Svg>
          </View>
          <Svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 16 16" >
            <Path fill="currentColor" d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8"></Path></Svg>
        </View>

        <View style={styles.icon}>
          <View style={styles.div}> <Text>Cash</Text>
            <Svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 26 26">
              <g fill="none" stroke="currentColor" strokeWidth={1.5}><Path strokeLinecap="round" strokeLinejoin="round" d="m2 11l2.807-3.157A4 4 0 0 1 7.797 6.5H8m-6 13h5.5l4-3s.81-.547 2-1.5c2.5-2 0-5.166-2.5-3.5C8.964 12.857 7 14 7 14"></Path><Path d="M8 13.5V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-6.5"></Path><Path strokeLinecap="round" strokeLinejoin="round" d="M15 12a2 2 0 1 1 0-4a2 2 0 0 1 0 4m4.5-1.99l.01-.011m-9.01.011l.01-.011"></Path></g></Svg>
          </View>
          <Svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 16 16" >
            <Path fill="currentColor" d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8"></Path></Svg>
        </View>

        <View style={styles.icon}>
          <View style={styles.div}> <Text>Card</Text>
            <Svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 26 26" >
              <Path fill="currentColor" d="M16.688 0c-.2.008-.393.044-.594.094L2.5 3.406C.892 3.8-.114 5.422.281 7.031l1.906 7.782A2.99 2.99 0 0 0 4 16.875V15c0-2.757 2.243-5 5-5h12.594l-1.875-7.719A3.004 3.004 0 0 0 16.687 0zm1.218 4.313l.813 3.406l-3.375.812l-.844-3.375zM9 12c-1.656 0-3 1.344-3 3v8c0 1.656 1.344 3 3 3h14c1.656 0 3-1.344 3-3v-8c0-1.656-1.344-3-3-3zm0 1.594h14c.771 0 1.406.635 1.406 1.406v1H7.594v-1c0-.771.635-1.406 1.406-1.406M7.594 19h16.812v4c0 .771-.635 1.406-1.406 1.406H9A1.414 1.414 0 0 1 7.594 23z"></Path></Svg>
          </View>
          <Svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 16 16" >
            <Path fill="currentColor" d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8"></Path></Svg>
        </View>
</View>
      <View style={styles.rs}>
      <Text>Recipient's signature :</Text>
        </View>
      </View>



    </Page>

  </Document >

);
///////////////////////
function InvoisModel(props) {
  const [show, setShow] = useState(false);
  const [dis, setDis] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  ////////////////////////////////////
  useEffect(
    function () {
      document.title = `SUNFLOWER - My Order `;
      return function () { document.title = 'SUNFLOWER' };
    }, [])
  ////////////////////////////////////
  const { t } = useTranslation();
  return (
    <>
      <div className={props.openMenu ? "returnOpen" : "returnClose"} onClick={handleShow} > {t("orders.invois")} </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='m'
      >
        <Modal.Header closeButton>
          <Modal.Title>INVOICE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PDFViewer style={{ height: "76vh", width: "100%" }}>
            <InvoicePDF
              order={props?.order}
              date={props?.date}
              user={props?.user}
              store={props?.storeInfo}
              discount={dis}
              total={props?.totalOffers + props?.totalPerfumes + props?.totalProducts}

            />
          </PDFViewer>
          <Form.Group as={Row} className="mb-1" controlId="form1">
            <Form.Label column sm="3" >  {t('public.addDis')}   </Form.Label>
            <Col sm="9">
              <Form.Control type="number" required
                value={dis}
                onChange={(e) => setDis(e.target.value)} />
            </Col>

          </Form.Group>


          {/* </div> */}
        </Modal.Body>
        <Modal.Footer id='modal-footer'>
          <Button
            className='loginBT'
            onClick={handleClose}
            style={{ width: "20%" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" ><path fill="currentColor" d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"></path></svg>
          </Button>
          <PDFDownloadLink className='loginBT'
            style={{ textDecoration: "none", width: "20%" }}
            document={<InvoicePDF  
            order={props?.order}
            date={props?.date}
            user={props?.user}
            store={props?.storeInfo}
            discount={dis}
            total={props?.totalOffers + props?.totalPerfumes + props?.totalProducts}
/>}
            fileName={props?.user?.name} 
            onClick={handleClose}
          >
            {({ loading }) => (
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" ><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path strokeDasharray={20} strokeDashoffset={20} d="M12 4h2v6h2.5l-4.5 4.5M12 4h-2v6h-2.5l4.5 4.5"><animate attributeName="d" begin="0.5s" dur="1.5s" repeatCount="indefinite" values="M12 4h2v6h2.5l-4.5 4.5M12 4h-2v6h-2.5l4.5 4.5;M12 4h2v3h2.5l-4.5 4.5M12 4h-2v3h-2.5l4.5 4.5;M12 4h2v6h2.5l-4.5 4.5M12 4h-2v6h-2.5l4.5 4.5"></animate><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="20;0"></animate></path><path strokeDasharray={14} strokeDashoffset={14} d="M6 19h12"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="14;0"></animate></path></g></svg>)}
          </PDFDownloadLink>
          <Button className='loginBT' variant="secondary"
            style={{ textDecoration: "none", width: "20%" }}
            onClick={handleClose}>

            {t("public.close")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default InvoisModel;