import Dexie, { Table } from "dexie";

export class Product extends Dexie 
{
  productsDB!: Table<ActiveProduct, number>;
  countryDB!: Table<Country, number>;
  stateDB!: Table<State, number>;
  categoryDB!: Table<Category, number>;
  manufacturerDB!: Table<Manufacturer, number>;
  modelDB!: Table<Model, number>;
  trimDB!: Table<Trim, number>;
  engineDB!: Table<Engine, number>;
  fuelDB!: Table<Fuel, number>;
  colourDB!: Table<Colour, number>;
  transmissionDB!: Table<Transmission, number>;
  conditionDB!: Table<Condition, number>;
  sliderDB!: Table<Slider, number>;
  advertImageDB!: Table<AdvertImage, number>;
  profileDB!: Table<Profile, number>;
  settingsDB!: Table<Settings, number>;
  
  constructor() 
  {
    super('AutoHubNiggs');
    this.version(1).stores(
      {
        productsDB: '++id, tb_id, user_id, title, face_image, slug, description, price, min_price, max_price, chasis_no, mileage, year, address, views, water_mark, category_id, category_name, hash, country, state, manufacturer, model, trim, colour, condition, transmission, engine, images, firstname, middlename, surname, phone, email',
        countryDB: '++id, tb_id, name, rate',
        stateDB: '++id, tb_id, country_id, name, rate',
        categoryDB: '++id, tb_id, name, icon, link, mobile, rate, hash',
        manufacturerDB: '++id, tb_id, name, icon, link, rate',
        modelDB: '++id, tb_id, manufacturer_id, name, rate',
        trimDB: '++id, tb_id, manufacturer_id, model_id, trim_id, name, rate',
        engineDB: '++id, tb_id, manufacturer_id, model_id, name, rate',
        fuelDB: '++id, tb_id, name',
        colourDB: '++id, tb_id, name, rate',
        transmissionDB: '++id, tb_id, name',
        conditionDB: '++id, tb_id, name',
        sliderDB: '++id, tb_id, product_id, title, price, slug, image_url, face_image, country, state',
        advertImageDB: '++id, tb_id, image, position, faceImage',
        profileDB: '++id, firstname, surname, phone, email, verified, reset, passport',
        settingsDB: '++id, id, auth, plan, contact_1, contact_2, address_1, address_2, x, facebook, tiktok, instagram, vacancy, career, blog_comment, post_comment, timer'
      }
    );
  }

  deleteFromProductsDB = (id: number) => 
  {
      this.transaction('rw', productsDB, function () 
      {
        productsDB.delete(id)
        return
      }).catch((err) => {
        console.log(err);
        throw err;
      }); 
  }

}

export const { 
                productsDB, 
                countryDB, 
                stateDB, 
                categoryDB, 
                manufacturerDB, 
                modelDB, 
                trimDB, 
                engineDB, 
                fuelDB, 
                colourDB, 
                transmissionDB, 
                conditionDB, 
                sliderDB, 
                profileDB, 
                deleteFromProductsDB, 
                settingsDB 
            } = new Product();