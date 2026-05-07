export interface PlantData {
  id: string;
  name: string;
  latinName: string;
  latitude: number;
  longitude: number;
  continent: string;
  vegetationType: string;
  climateFeature: string;
  modelPath: string;
  description: string;
}

const plants: PlantData[] = [
  {
    id: "plant-01",
    name: "桂花",
    latinName: "Osmanthus fragrans",
    latitude: 30.2,
    longitude: 120.2,
    continent: "亚洲",
    vegetationType: "常绿灌木/小乔木",
    climateFeature: "亚热带季风气候",
    modelPath: "/models/妗傝姳.glb",
    description: "桂花是中国传统十大名花之一，花小而有浓香，秋季开花，广泛栽培于长江流域及以南地区。",
  },
  {
    id: "plant-02",
    name: "桉树",
    latinName: "Eucalyptus",
    latitude: -33.8,
    longitude: 151.0,
    continent: "大洋洲",
    vegetationType: "常绿乔木",
    climateFeature: "温带到亚热带气候",
    modelPath: "/models/妗夋爲.glb",
    description: "桉树是澳大利亚代表性树种，生长迅速，适应性强，是重要的木材和精油来源。",
  },
  {
    id: "plant-03",
    name: "毛竹",
    latinName: "Phyllostachys edulis",
    latitude: 28.2,
    longitude: 118.0,
    continent: "亚洲",
    vegetationType: "常绿竹类",
    climateFeature: "亚热带湿润气候",
    modelPath: "/models/姣涚.glb",
    description: "毛竹是中国分布最广的竹种，生长速度极快，是重要的建筑和工艺品材料。",
  },
  {
    id: "plant-04",
    name: "高山雪莲",
    latinName: "Saussurea involucrata",
    latitude: 30.3,
    longitude: 86.0,
    continent: "亚洲",
    vegetationType: "高山草本",
    climateFeature: "高山寒带气候",
    modelPath: "/models/楂樺北闆幉.glb",
    description: "高山雪莲生长于海拔4000米以上的高山流石滩，是珍贵的中药材，被誉为西域奇花。",
  },
  {
    id: "plant-05",
    name: "北美红杉",
    latinName: "Sequoia sempervirens",
    latitude: 41.5,
    longitude: -124.0,
    continent: "北美洲",
    vegetationType: "常绿乔木",
    climateFeature: "温带海洋性气候",
    modelPath: "/models/鍖楃編绾㈡潐.glb",
    description: "北美红杉是世界上最高的树种之一，可高达115米，分布于美国加州沿海地区。",
  },
  {
    id: "plant-06",
    name: "猴面包树",
    latinName: "Adansonia digitata",
    latitude: -20.0,
    longitude: 45.0,
    continent: "非洲",
    vegetationType: "落叶乔木",
    climateFeature: "热带稀树草原气候",
    modelPath: "/models/鐚撮潰鍖呮爲.glb",
    description: "猴面包树是非洲草原的标志性树种，树干粗壮可储水，寿命可达数千年。",
  },
  {
    id: "plant-07",
    name: "百合",
    latinName: "Lilium",
    latitude: 45.0,
    longitude: 4.0,
    continent: "欧洲",
    vegetationType: "多年生草本",
    climateFeature: "温带大陆性气候",
    modelPath: "/models/鐧惧悎.glb",
    description: "百合花大而美丽，是重要的观赏花卉，广泛分布于北半球温带地区。",
  },
];

export default plants;
